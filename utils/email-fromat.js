export const emailVerification=(verificationLink)=>`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            width: 600px;
            margin: 50px auto;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            font-size: 20px;
            margin: 0;
        }
        .content p {
            font-size: 16px;
            color: #333;
        }
        .btn {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 15px 25px;
            font-size: 18px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 20px;
        }
        .btn:hover {
            background-color: #218838;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #888;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="header">
            <h1>Welcome to Our Website!</h1>
        </div>

        <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>To complete your registration, we need to verify your email address. Please click the button below to verify your account:</p>
            <a href="{{verification_link}}" class="btn">Verify Email</a>
        </div>

        <div class="footer">
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>Need help? <a href="mailto:support@example.com">Contact us</a>.</p>
        </div>
    </div>

</body>
</html>
`;



export const resetCodeEmail = (code) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            width: 600px;
            margin: 50px auto;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #ffc107;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            font-size: 20px;
            margin: 0;
        }
        .content p {
            font-size: 16px;
            color: #333;
            margin: 15px 0;
        }
        .code-box {
            font-size: 32px;
            font-weight: bold;
            background-color: #f8f9fa;
            color: #343a40;
            display: inline-block;
            padding: 15px 25px;
            border-radius: 8px;
            letter-spacing: 10px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #888;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>

        <div class="content">
            <h2>Here's Your 4-Digit Reset Code</h2>
            <p>Use the code below to reset your password. The code is valid for a limited time only.</p>
            <div class="code-box">${code}</div>
        </div>

        <div class="footer">
            <p>If you didn’t request a password reset, you can safely ignore this email.</p>
            <p>Need help? <a href="mailto:support@example.com">Contact us</a>.</p>
        </div>
    </div>

</body>
</html>`;
