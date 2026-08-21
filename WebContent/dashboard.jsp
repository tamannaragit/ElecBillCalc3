<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Electricity Bill Calculator</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<nav class="navbar">

    <div class="nav-inner">

        <a class="brand" href="dashboard.html">
            ⚡ Electricity Bill Calculator
        </a>

        <div class="nav-right">
            <span class="nav-user">
                Hi, <span id="navUser">User</span>
            </span>

            <button class="logout-btn" onclick="logout()">
                Logout
            </button>
        </div>

    </div>

</nav>

<main>

<div class="container">

    <div class="eyebrow">USER DASHBOARD</div>

    <h1 class="page-title">
        Welcome back, <span id="welcomeUser">User</span>!
    </h1>

    <p class="description">
        Keep track of your monthly electricity expenses in one place.
    </p>


    <div class="stats">

        <div class="card">
            <div class="stat-icon">📅</div>
            <div class="stat-value" id="monthCount">0</div>
            <div class="stat-label">Months Saved</div>
        </div>

        <div class="card">
            <div class="stat-icon">₹</div>
            <div class="stat-value" id="totalBill">₹0.00</div>
            <div class="stat-label">Total Bill Amount</div>
        </div>

        <div class="card">
            <div class="stat-icon">≈</div>
            <div class="stat-value" id="averageBill">₹0.00</div>
            <div class="stat-label">Average Monthly Bill</div>
        </div>

    </div>


    <div class="card cta">

        <div>

            <div class="eyebrow">
                MONTHLY CALCULATOR
            </div>

            <h2>
                Calculate your electricity bill
            </h2>

            <p>
                Enter your billing date and units consumed
                to calculate your monthly bill.
            </p>

        </div>

        <a class="btn-small" href="calculate.jsp">
            Calculate Monthly Bill →
        </a>

    </div>


    <div class="eyebrow">
        HISTORY
    </div>

    <h2>Monthly Bills</h2>

    <div id="billHistory" class="bill-list"></div>

</div>

</main>

<script src="js/script.js"></script>

</body>
</html>