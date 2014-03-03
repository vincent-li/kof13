module.exports = Rendering;

function Rendering() {
}

/**
 * Render html template
 */
Rendering.prototype.render = function render(view) {
    this.res.render(view, this.context);
    if (this.context.inAction) {
        this.next();
    }
};

