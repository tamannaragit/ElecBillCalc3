<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Electricity Bill Calculator</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<div class="auth-page">

    <div class="auth-card">

        <div class="logo">⚡</div>

        <h1>Electricity Bill Calculator</h1>

        <p class="subtitle">
            Sign in to calculate and track your monthly electricity bills.
        </p>

        <div id="loginError" class="alert error hidden">
            ⚠ Invalid username or password.
        </div>

        <form id="loginForm" action="login" method="post">

            <div class="form-group">
                <label>Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required>
            </div>

            <button class="btn btn-primary" type="submit">
                Login
            </button>

        </form>

        <div class="auth-footer">
            Don't have an account?
            <a href="register.jsp">Create Account</a>
        </div>

    </div>

</div>

<script src="js/script.js"></script>

</body>
</html>