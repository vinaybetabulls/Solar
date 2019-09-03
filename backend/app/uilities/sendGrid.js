const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey('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');

module.exports.send = function send(id, to, data = {}) {
    return new Promise((resolve, reject) => {
        // this.send = (id, to, data = {}) => {
        sendgrid.send({
            to, 
            from: 'hej@digitak.se',
            templateId: id,
            dynamic_template_data: data
          
        }).then(resolve).catch(reject);
        // }
    });
};


