var Module = require('module');
var path = require('path');
var fs = require('fs');

exports.addCoverage = function addCoverage(code, filename) {
    filename = filename.replace(/\\/g, '\\\\');
    if (!~filename.indexOf(addCoverage.subdir)) {
        return code;
    }
    if (process.env.COVERAGE && !~filename.indexOf(process.env.COVERAGE)) {
        return code;
    }
    var lines = code.split('\n');

    if (lines.length > 0) {
        lines[0] = 'if (!__cov["' + filename + '"]) {__cov["' + filename + '"] = { 0: 1}; }' + lines[0];
    }

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].match(/^\s\*\s/)) continue;
        var name = '__cov["' + filename + '"][' + i + ']';
        var covLine = ' ' + name + ' = (' + name + ' || 0) + 1;';
        lines[i] = lines[i]
        .replace(/;$/, ';' + covLine)
        .replace(/^\s*(return|throw|break|continue)/, covLine + ' $1');
    }

    return lines.join('\n');
};

var projectName;

exports.init = function init(subdir, name) {
    projectName = name;
    if (process.env.NOCOV || global.__cov) return;
    if (!subdir) {
        subdir = process.cwd();
    } else if (!subdir.match(/^\//)) {
        subdir = path.join(process.cwd(), subdir);
    }
    global.__cov = {};
    exports.addCoverage.subdir = subdir;
    var compile = Module.prototype._compile;
    Object.keys(Module._cache).forEach(function (path) {
        if (path.match(/node_modules/)) return;
        delete Module._cache[path];
    });
    Module.prototype._compile = function (code, filename) {
        if (~filename.indexOf(subdir)) {
            code = exports.addCoverage(code, filename);
        }
        return compile.call(this, code, filename);
    };
};

exports.report = function () {
    if (process.env.NOCOV) return;
    coverageReport();
};

function coverageReport() {
    var cwd = process.cwd(),
    total_lines = 0,
    total_covered = 0,
    files = [];

    for (file in __cov) {
        if (file.search(cwd) === -1 || file.search(cwd + '/node_modules') !== -1) continue;
        var shortFileName = file.replace(cwd + '/', '');
        var id = shortFileName.replace(/[^a-z]+/gi, '-').replace(/^-|-$/, '');
        var code = syntax(fs.readFileSync(file).toString()).split('\n');
        var cnt = code.filter(function (line) {
            return line.match(/;$/) && !line.match(/^\s\*\s/);
        }).length;
        var covered = Object.keys(__cov[file]).length;
        if (covered > cnt) covered = cnt;
        var coveredPercentage = cnt === 0 ? 100 : Math.round((covered / cnt) * 100);
        total_covered += covered;
        total_lines += cnt;
        var html = '<div id="' + id + '" class="file"><div class="row" style="margin-left: 30px;">';
        html += '<div class="span5">';
        html += '<a href="#' + id +
            '" class="filename trigger" name="' + id + '"' +
            '>' + shortFileName +
            '</a>';
        html += '</div><div class="span6">';
        var progressClass = 'progress-danger';
        if (coveredPercentage > 30) {
            progressClass = 'progress-warning';
        }
        if (coveredPercentage >= 80) {
            progressClass = 'progress-success';
        }
        html += '<div class="progress ' + progressClass + '"> <div class="bar" style="width: ' + coveredPercentage +
            '%"><strong>' + coveredPercentage +
            '%</strong> [' + covered + '/' + cnt + ']</div></div></div>';
        html += '</div>';

        html += '<div class="file-contents"><pre><ol>';
        code.forEach(function (line, i) {
            html += '<li class="' + (__cov[file][i] ? 'covered' : (line.match(/;$/) && !line.match(/ \* /) ? 'uncovered' : '')) + '"><code>' + line + '</code>';
            if (__cov[file][i] && i) {
                html += '<span class="hits">' + __cov[file][i] + '</span>';
            }
            html += '</li>';
        });
        html += '</ol></pre></div></div>';

        if (cnt > 1) {
            files.push({
                lines: cnt,
                covered: covered,
                id: id,
                name: shortFileName,
                html: html
            });
        }
    }

    var groups = {};
    files.sort(byName).forEach(function (f) {
        var group = f.name.replace(/\/[^\/]+$/, '');
        if (!groups[group]) groups[group] = [];
        groups[group].push(f);
    });

    var groupsListHTML = [];
    var html = Object.keys(groups).map(function (g) {
        var tltc = 0; // total lines to cover
        var tlcd = 0; // total lines covered
        var files = groups[g].sort(bySize).map(function (f) {
            tltc += f.lines;
            tlcd += f.covered;
            return f.html;
        }).join('\n');
        var gid = g.toLowerCase().replace(/[^a-z]/i, '-');
        var percentage = Math.round(100 * tlcd / tltc);
        groupsListHTML.push('<li><a href="#' + gid + '">./' + g + ' (' + percentage + '%)</a></li>');
        return '<div class="group-header row" id="' + gid + '"><div class="group-name span5">./' + g + '</div><div class="span6">' + progressBar(tlcd, tltc) + '</div></div>' + files;
    }).join('\n');

    function byName(x, y) {
        return x.name > y.name ? -1 : 1;
    }
    function bySize(x, y) {
        return y.lines - x.lines;
    }


    if (!fs.existsSync(cwd + '/coverage')) fs.mkdirSync(cwd + '/coverage');

    fs.writeFileSync(cwd + '/coverage/index.html',
        fs.readFileSync(path.join(__dirname, '/assets/coverage.html'))
        .toString()
        .replace('PROJECT', projectName || '')
        .replace('PROGRESS', progressBar(total_covered, total_lines))
        .replace('CODE', html.replace(/\$'/g, '&#36;\''))
        .replace('GROUPS', groupsListHTML.join(''))
    );

    copy('bootstrap.css');
    copy('style.css');
    copy('coverage.js');
    copy('bootstrap.js');
    copy('jquery.min.js');

    console.log('====================');
    console.log('TOTAL COVERAGE:', Math.round((total_covered / (total_lines)) * 100) + '%');
}

function progressBar(x, total) {
    var percentage = total === 0 ? 100 : Math.round((x / total) * 100);
    var progressClass = 'progress-danger';
    if (percentage > 30) {
        progressClass = 'progress-warning';
    }
    if (percentage >= 80) {
        progressClass = 'progress-success';
    }
    return '<div class="progress ' + progressClass + '"> <div class="bar" style="width: ' + percentage +
    '%"><strong>' + percentage +
    '%</strong> [' + x + '/' + total + ']</div></div>';

}

function copy(file) {
    var source = path.join(__dirname, 'assets', file);
    var destination = path.join(process.cwd(), 'coverage', file);
    var contents = fs.readFileSync(source).toString();
    fs.writeFileSync(destination, contents);
}

function syntax(code) {
    var comments    = [];
    var strings     = [];
    var res         = [];
    var all         = { 'C': comments, 'S': strings, 'R': res };
    var safe        = { '<': '&lt;', '>': '&gt;', '&': '&amp;' };

    return code
        .replace(/[<>&]/g, function (m)
            { return safe[m]; })
        .replace(/\/\/.*$/gm, function (m)
            { var l=comments.length; comments.push(m); return '~~~C'+l+'~~~';   })
        .replace(/\/\*[\s\S]*?\*\//g, function (m)
            { var l=comments.length; comments.push(m); return '~~~C'+l+'~~~';   })
        .replace(/([^\\])((?:'(?:\\'|[^'\n])*')|(?:"(?:\\"|[^"\n])*"))/g, function (m, f, s)
            { var l=strings.length; strings.push(s); return f+'~~~S'+l+'~~~'; })
        // .replace(/\/(\\\/|[^\/\n])*\/[gim]{0,3}/g, function(m)
        //    { var l=res.length; res.push(m); return '~~~R'+l+'~~~';   })
        .replace(/(var|function|typeof|new|return|prototype|if|for|in|while|break|do|continue|switch|case)([^a-z0-9\$_])/gi,
            '<span class="kwrd">$1</span>$2')
        .replace(/(\{|\}|\]|\[|\|)/gi,
            '<span class="gly">$1</span>')
        .replace(/([a-z\_\$][a-z0-9_]*)[\s]*\(/gi,
            '<span class="func">$1</span>(')
        .replace(/~~~([CSR])(\d+)~~~/g, replaceCSR)

    function replaceCSR(m, t, i) {
        var openTag = '<span class="' + t + '">';
        var closeTag = '</span>';
        return openTag +
            all[t][i].replace(/\n/g, closeTag + '\n' + openTag) +
            closeTag;
    }
}

