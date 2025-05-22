<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Mã OTP Khôi Phục Mật Khẩu</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            max-width: 520px;
            margin: auto;
            background: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .otp-box {
            font-size: 28px;
            font-weight: bold;
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
            letter-spacing: 6px;
            margin: 20px 0;
        }
        .footer {
            font-size: 13px;
            color: #777;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Xin chào!</h2>

        <p>Bạn hoặc ai đó đã yêu cầu khôi phục mật khẩu cho tài khoản có email: <strong>{{ $email }}</strong></p>

        <p>Vui lòng sử dụng mã OTP dưới đây để hoàn tất việc đặt lại mật khẩu:</p>

        <div class="otp-box">{{ $otp }}</div>

        <p>Mã này sẽ hết hạn sau <strong>10 phút</strong>. Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>

        <p>Trân trọng,<br>Đội ngũ hỗ trợ HSR Fandom</p>

        <div class="footer">
            &copy; {{ date('Y') }} Ứng dụng của bạn. Mọi quyền được bảo lưu.
        </div>
    </div>
</body>
</html>
