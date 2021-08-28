module.exports = {
    HTML: function (title, list, body, control) {
        return `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    <style>
        .centered{
          padding-top:40px;
          width:500px;
          margin: 10px auto;
          
        }
      
    </style>
      
    </head>
    
    <body>
    <div class = "centered">
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
      </div>
    </body>
    </html>
    
    `;
    },
    list: function (topic) {
        var list = '<ul>';
        var i = 0;
        while (i < topic.length) {
            list =
                list +
                `<li><a href="/topic/${topic[i].id}">${topic[i].title}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    },
};
