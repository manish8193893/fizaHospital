export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Fiza Hospital</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-shell { width: 100% !important; }
      .mobile-stack { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .hero-copy { padding: 26px 22px !important; }
      .hero-photo { height: 210px !important; }
      .service-cell { display: block !important; width: 100% !important; padding: 6px 0 !important; }
      .service-card { min-height: 0 !important; }
      .outer-pad { padding: 12px !important; }
    }
    @media only screen and (max-width: 380px) {
      .hero-title { font-size: 27px !important; line-height: 31px !important; }
      .brand-name { font-size: 19px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#edf2f8;font-family:Arial,Helvetica,sans-serif;color:#17243a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#edf2f8">
    <tr>
      <td class="outer-pad" align="center" style="padding:30px 14px;">
        <table role="presentation" class="email-shell" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:22px 28px;background:#ffffff;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="46" height="46" align="center" valign="middle" style="width:46px;height:46px;border-radius:50%;background:#e8f1ff;color:#31598f;font-size:27px;font-weight:bold;">✚</td>
                  <td style="padding-left:12px;">
                    <div class="brand-name" style="font-size:22px;line-height:26px;font-weight:700;letter-spacing:.3px;color:#31598f;">FIZA HOSPITAL</div>
                    <div style="font-size:11px;line-height:16px;letter-spacing:1.3px;color:#7a8ba3;">CARE. COMFORT. CONFIDENCE.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 20px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#102b4c" style="background:#102b4c;border-radius:13px;overflow:hidden;">
                <tr>
                  <td class="mobile-stack hero-copy" width="52%" valign="middle" style="width:52%;padding:30px 25px;color:#ffffff;">
                    <div style="margin-bottom:9px;color:#a9d7ff;font-size:11px;font-weight:bold;letter-spacing:1.8px;">YOUR CARE JOURNEY STARTS HERE</div>
                    <h1 class="hero-title" style="margin:0 0 13px;color:#ffffff;font-size:34px;line-height:38px;font-weight:700;">WELCOME<br>TO FIZA</h1>
                    <p style="margin:0;color:#e4edf8;font-size:14px;line-height:21px;">Hello {{name}}, your Fiza Hospital account is ready. We’re glad to be part of your healthcare journey.</p>
                  </td>
                  <td class="mobile-stack" width="48%" valign="middle" style="width:48%;padding:0;background:#173b63;">
                    <img class="hero-photo" src="https://images.unsplash.com/photo-1758691461973-553db5285280?auto=format&amp;fit=crop&amp;w=1000&amp;q=82" width="300" height="260" alt="A doctor and patient reviewing a medical scan together" style="display:block;width:100%;height:260px;object-fit:cover;border:0;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 20px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="service-cell" width="33.33%" valign="top" style="width:33.33%;padding:0 5px 0 0;">
                    <table role="presentation" class="service-card" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#3566a5" style="min-height:150px;background:#3566a5;border-radius:11px;color:#ffffff;">
                      <tr><td style="padding:17px 14px 16px;">
                        <div style="font-size:21px;line-height:27px;">▣</div>
                        <div style="padding:4px 0 6px;font-size:16px;line-height:20px;font-weight:bold;">Your Account</div>
                        <div style="font-size:12px;line-height:17px;color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;font-weight:bold;">Your account was created with <a href="mailto:{{email}}" style="font-weight:bold;color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;text-decoration:none !important;">{{email}}</a></div>
                      </td></tr>
                    </table>
                  </td>
                  <td class="service-cell" width="33.33%" valign="top" style="width:33.33%;padding:0 3px;">
                    <table role="presentation" class="service-card" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#76527f" style="min-height:150px;background:#76527f;border-radius:11px;color:#ffffff;">
                      <tr><td style="padding:17px 14px 16px;">
                        <div style="font-size:21px;line-height:27px;">✚</div>
                        <div style="padding:4px 0 6px;font-size:16px;line-height:20px;font-weight:bold;">Care Team</div>
                        <div style="font-size:12px;line-height:17px;color:#f6eff8;">Find the right care and support for your needs.</div>
                      </td></tr>
                    </table>
                  </td>
                  <td class="service-cell" width="33.33%" valign="top" style="width:33.33%;padding:0 0 0 5px;">
                    <table role="presentation" class="service-card" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#3566a5" style="min-height:150px;background:#3566a5;border-radius:11px;color:#ffffff;">
                      <tr><td style="padding:17px 14px 16px;">
                        <div style="font-size:21px;line-height:27px;">♡</div>
                        <div style="padding:4px 0 6px;font-size:16px;line-height:20px;font-weight:bold;">Here to Help</div>
                        <div style="font-size:12px;line-height:17px;color:#edf4ff;">Contact the hospital team whenever you need assistance.</div>
                      </td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 25px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f8fc" style="background:#f5f8fc;border-radius:11px;">
                <tr>
                  <td style="padding:19px 20px;">
                    <div style="font-size:17px;line-height:22px;font-weight:bold;color:#203654;">A warm welcome to Fiza Hospital</div>
                    <p style="margin:8px 0 0;font-size:13px;line-height:20px;color:#62738a;">Thank you for registering with us. Keep this email for your records, and contact our team if you need help with your account.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:16px 24px;background:#102b4c;color:#ffffff !important;font-size:11px;line-height:18px;">
              <div style="font-size:13px;font-weight:bold;color:#ffffff;">Fiza Hospital</div>
              <div style="padding-top:4px;color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;">This is an automated welcome message for <a href="mailto:{{email}}" style="color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;text-decoration:none !important;">{{email}}</a>.</div>
              <table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="margin:12px auto 0;">
                <tr>
                  <td align="center" style="padding:0 10px;">
                    <a href="https://www.instagram.com/careforsomeone/" aria-label="Instagram @careforsomeone" style="display:inline-block;color:#ffffff !important;text-decoration:none !important;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:24px;white-space:nowrap;">
                      <img src="https://cdn.simpleicons.org/instagram/ffffff" width="18" height="18" alt="Instagram" style="display:inline-block;width:18px;height:18px;border:0;vertical-align:middle;">
                      <span style="color:#ffffff !important;vertical-align:middle;">&nbsp;Instagram</span>
                    </a>
                  </td>
                  <td align="center" style="padding:0 10px;">
                    <a href="https://wa.me/918742970516" aria-label="WhatsApp Fiza Hospital" style="display:inline-block;color:#ffffff !important;text-decoration:none !important;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:24px;white-space:nowrap;">
                      <img src="https://cdn.simpleicons.org/whatsapp/ffffff" width="18" height="18" alt="WhatsApp" style="display:inline-block;width:18px;height:18px;border:0;vertical-align:middle;">
                      <span style="color:#ffffff !important;vertical-align:middle;">&nbsp;WhatsApp</span>
                    </a>
                  </td>
                  <td align="center" style="padding:0 10px;">
                    <a href="mailto:manish8193892@gmail.com" aria-label="Email Fiza Hospital" style="display:inline-block;color:#ffffff !important;text-decoration:none !important;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:24px;white-space:nowrap;">
                      <img src="https://api.iconify.design/mdi/email-outline.svg?color=%23ffffff" width="19" height="18" alt="Email" style="display:inline-block;width:19px;height:18px;border:0;vertical-align:middle;">
                      <span style="color:#ffffff !important;vertical-align:middle;">&nbsp;Email</span>
                    </a>
                  </td>
                </tr>
              </table>
              <div style="padding-top:7px;">I Love Fiza Hospital.</a></div>
              <div style="padding-top:7px;">🌻❤️ | ❤️🌻</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use below OTP to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 24 hours.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 15 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

