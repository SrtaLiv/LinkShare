package com.login.demo.mail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService{

    private final JavaMailSender mailSender;
    private final String URL = "http://localhost:8081/auth/confirm?token=";
   // private static final ClassPathResource TEMPLATE = new ClassPathResource("static/templates/confirmation_template.html");

    @Value("${spring.mail.username}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    public void sendVerificationEmail(ConfirmationToken confirmationToken) {
        try {
            // Crear un mensaje MIME
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            // Construir el enlace de verificación
            String verificationLink = URL + confirmationToken.getToken();

            // Construir el cuerpo del mensaje
            String htmlMessage = "<h1>Verifica tu cuenta</h1>" +
                    "<p>Gracias por registrarte. Haz clic en el enlace de abajo para verificar tu cuenta:</p>" +
                    "<a href=\"" + verificationLink + "\">Verificar Cuenta</a>" +
                    "<p>Este enlace será válido por 15 minutos.</p>";

            // Configurar detalles del correo
            helper.setFrom(from);
            helper.setTo(confirmationToken.getUserSec().getEmail()); // Asegúrate de que ConfirmationToken tenga un usuario asociado con correo.
            helper.setSubject("Verificación de cuenta");
            helper.setText(htmlMessage, true); // true para texto HTML

            // Enviar el correo
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar el correo de verificación: " + e.getMessage(), e);
        }
    }

}
