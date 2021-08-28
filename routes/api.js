const apiRouter = require('express').Router();
apiRouter.post('/sayHello', function (req, res) {
    console.log(req.body);
    const responseBody = {
        version: '2.0',
        template: {
            outputs: [
                {
                    simpleText: {
                        text: "hello I'm Ryan",
                    },
                },
            ],
        },
    };

    res.status(200).send(responseBody);
});
module.exports = apiRouter;
