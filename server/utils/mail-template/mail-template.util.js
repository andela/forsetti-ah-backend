/**
 * Base Email Template
 * @param {String} emailTitle - Body of message
 * @param {String} message - Title of the email
 * @returns {Html} Response
 */
const baseTemplate = (emailTitle, message) => `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Authors Haven</title>
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin: 0pt auto; padding: 0px; background:#F4F7FA;">
  <table id="main" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F4F7FA">
    <tbody>
      <tr>
        <td valign="top">
          <table cellpadding="0" width="580" cellspacing="0" border="0" bgcolor="#F4F7FA" align="center"
            style="margin:0 auto; table-layout: fixed;">
            <tbody>
              <!-- START of MAIL Content -->
              <tr>
                <td colspan="4">
                  <!-- Logo start here -->
                  <table class="logo" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td valign="top" align="center">
                          <p style="font-family: 'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;color:#4E5C6E;line-height:20px;font-size:1.5rem;">AUTHOR'S
                            HAVEN</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Logo end here -->
                  <!-- Main CONTENT -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <tbody>
                      <tr>
                        <td height="40"></td>
                      </tr>
                      <tr style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI; color:#4E5C6E; font-size:14px; line-height:20px; margin-top:20px;">
                        <td class="content" colspan="2" valign="top" align="center" style="padding-left:90px; padding-right:90px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                            <tbody>
                              <tr>
                                <td align="center" valign="bottom" colspan="2" cellpadding="3">
                                  <img alt="Authors Haven Image" width="80" src="https://res.cloudinary.com/dsfgp1nzh/image/upload/v1554399400/envelope.jpg" />
                                </td>
                              </tr>
                              <tr>
                                <td height="30" &nbsp;=""></td>
                              </tr>
                              <tr>
                                <td align="center"> <span style="color:#48545d;font-size:22px; line-height: 24px;">
                                    ${emailTitle}
                                  </span>
                                </td>
          
                              </tr>
                              
                              <tr>
                                <td align="center" style="margin:50px;"> <span style="color:#48545d; font-size:14px; line-height:20px;">
                                    ${message}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td valign="top" width="48%" align="center"> <span>
                                    <a href=${process.env.FRONTEND_URL} style="display:block; padding:15px 25px; background-color:#40617B; color:#ffffff; border-radius:3px; text-decoration:none;">Visit Authors Haven</a>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td height="60"></td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Main CONTENT end here -->
                  <!-- FOOTER start here -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr style="background-color: #40617B; color:white">
                        <td valign="top" align="center"> <span style="font-family: -apple-system,BlinkMacSystemFont,sans-serif; color:#9EB0C9; font-size:10px;">&copy;
                            <a href="#" target="_blank" style="color:#9EB0C9; text-decoration:none;">Author's
                              Haven</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#" target="_self" style="color:#9EB0C9; text-decoration:none;">&copy; 2019 </a>
                            &nbsp; &nbsp; &nbsp; <a href="#" style="color:#9EB0C9; text-decoration: none;">click to unsuscribe for this message</a>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td height="50">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- FOOTER end here -->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;

export default baseTemplate;
