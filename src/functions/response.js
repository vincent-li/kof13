module.exports = {
    success: function(data){
        return JSON.stringify({
            data: data,
            success: true,
            error: '',
            errorMsg: ''
        });
    },
    error: function(er) {
        return JSON.stringify({
            data: {},
            success: false,
            error: er,
            errorMsg: ''
        });
    }
}