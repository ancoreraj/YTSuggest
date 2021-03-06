const send = require('./index')

const getHtml = (id) => {
    const htm = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Subscription</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <style>
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: 'Manrope', sans-serif;
        }

        .main {
            background-color: rgb(37, 35, 35);
            padding: 20px 40px 60px 40px;
        }

        .img {
            width: 200px;
            height: 200px;
            margin: 5px;
        }

        h1 {

            color: #d9d9d9;
            margin-bottom: 0;
            margin-top: 10px;
            text-shadow: 2px 2px 4px #615f5f;

        }

        h4 {

            color: #d9d9d9;
            margin-top: 2px;
            font-weight: 400;
            margin-bottom: 50px;

        }

        .btn {

            text-decoration: none;
            color: white !important;
            background-color: #ff3f3f;
            padding: 8px 12px;
            border-radius: 2px;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 500;
            box-shadow: 0px 0px 5px #6b6b6b;
            margin-left: 0px;

        }
        .btn:hover{
            color: white;
        }

    </style>
</head>

<body>
    <div class="main">
        <div class="center">
            

            <img class="img" src="https://raw.githubusercontent.com/ancoreraj/secret-message/master/public/ankur-final.gif" alt="GIF">

            <h1>Welcome to Youtube Suggest</h1>
            <h4>Get an awesome, out of the box youtube video suggestion in your inbox everyday.</h4>
           
            <a class="btn" href="https://ytsuggest.herokuapp.com/confirm${id}">Confirm your Subscription</a>


        </div>
    </div>
</body>

</html>
`
    return htm
}


let from = `YT Suggest <i***@gmail.com>`
const sendEmail = (emailTo, id) => {
    const emailOptions = {
        subject: "Confirm your email",
        html: getHtml(id),
        to: emailTo,
        from: from,
    }

    send(emailOptions);
}

//https://stackoverflow.com/questions/45437557/this-app-isnt-verified-this-app-hasnt-been-verified-by-google-yet-only-procee

module.exports = sendEmail


