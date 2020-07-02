export const content = (script) =>
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Amani Signature Pad</title>
  <meta name="description" content="Signature Pad - HTML5 canvas based smooth signature drawing using variable width spline interpolation.">

  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <style>
    body {
      background: white;
      font-family: Helvetica, Sans-Serif;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    .m-signature-pad {
      font-size: 10px;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      margin: 0;
    }

    .m-signature-pad:before, .m-signature-pad:after {
      position: absolute;
      z-index: -1;
      content: "";
      width: 40%;
      height: 10px;
      left: 20px;
      bottom: 10px;
      background: white;
      -webkit-transform: skew(-3deg) rotate(-3deg);
      -moz-transform: skew(-3deg) rotate(-3deg);
      -ms-transform: skew(-3deg) rotate(-3deg);
      -o-transform: skew(-3deg) rotate(-3deg);
      transform: skew(-3deg) rotate(-3deg);
    }

    .m-signature-pad:after {
      left: auto;
      right: 20px;
      -webkit-transform: skew(3deg) rotate(3deg);
      -moz-transform: skew(3deg) rotate(3deg);
      -ms-transform: skew(3deg) rotate(3deg);
      -o-transform: skew(3deg) rotate(3deg);
      transform: skew(3deg) rotate(3deg);
    }

    .m-signature-pad--body {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #ffffff;
    }

    .m-signature-pad--body
      canvas {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: #ffffff;
      }

    .m-signature-pad--footer {
      position: absolute;
      bottom: 0px;
      background-color: #263B5B;
      height: 20vh;
      min-Height: 125px;
      display:flex;
      width:100%;
      flex-direction:row;
      justify-content: center;
    }

    .m-signature-pad--footer
      .button {
        flex-grow:1;
        width: 45%;
        position: absolute;
        bottom: 0;
        padding: 0 20px;
        background-color: #263B5B;
        line-height: 32px;
        text-align: center;
        color: #FFF;
        border: 1px solid transparent;
        border-radius: 0;
        outline: none;
        box-shadow: none;
        font-size: 14px;
      }

    .m-signature-pad--footer
      .button.clear {
        left: 0;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        box-shadow: 0px 2px 16px rgba(38, 33, 48, 0.4);
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
      }

    .m-signature-pad--footer
      .button.save {
        right: 0;
        background: linear-gradient(176.14deg, #FFD439 -197.62%, #DB6400 283.46%);
        box-shadow: 0px 2px 16px rgba(38, 33, 48, 0.4);
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        font-weight: bold;
      }

      .m-signature-pad--footer
        .button:disabled {
          opacity: 0.7;
        }

      .m-signature-pad--footer-text-bg {
        background: linear-gradient(352.16deg, #5E3B9B -5.46%, #157EC1 115.71%);
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 20px;
        margin: 10px;
        margin-bottom: 0;
        border-radius: 10px;
      }
    
    .m-signature-pad--footer-text {
      color: #fff;
      font-size: 14px;
      margin: 10px auto;
    }
</style>
</head>
<body onselectstart="return false">
  <div id="signature-pad" class="m-signature-pad">
    <div class="m-signature-pad--body">
      <canvas></canvas>
    </div>
    <div class="m-signature-pad--footer">
      <div class="m-signature-pad--footer-text-bg">
        <p class="m-signature-pad--footer-text">Signature should match with the one on your ID</p>
      </div>
      <button id="clear" type="button" class="button clear" data-action="clear">Clear</button>
      <button id="approve" type="button" class="button save" data-action="save">APPROVE</button>
    </div>
  </div>

  <script>
    ${script}
  </script>
</body>
</html>`;
