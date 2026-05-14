const HTMLRecoveryEmail = (code) => `
<div style= "Font-family: sans-serif; text-align: center; padding:20px, max-width:500px; border:1px solid #ddd;>
<h2 style = "color: #2c3e50;">Password Recovery </h2>
<p>Usa el código de verificación para restablecer tu contraseña:</p>
<div style = "display: inline-block; padding:10px 20px; font-weight:bold; color: #fff; background: #ff7f50;
border-radius: 5px; " >
${ code }
</div>
<p style = "Font-size: 12px; color: #777;">Valido por 15 min, si no lo solicito, ignorelo.
</p>
<hr>
<footer style = "Font-size: 10px; color #aaa;">
Support: support@example.com
</Footer>
</div>

`;  
export default HTMLRecoveryEmail