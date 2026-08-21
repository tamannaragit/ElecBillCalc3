<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculate Bill</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<div id="toastContainer" class="toast-container"></div>

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

    <a href="dashboard.html" class="back-link">
        ← Dashboard
    </a>

    <div class="calculate-header">

        <div class="eyebrow">
            MONTHLY BILL
        </div>

        <h1 class="page-title">
            Calculate Electricity Bill
        </h1>

        <p class="description">
            Choose a billing date and enter the number of units consumed.
        </p>

    </div>


    <div class="card calculator">

        <div id="calcError" class="alert error hidden"></div>

        <div class="form-group">

            <label>Billing Month</label>

            <input
                type="month"
                id="billingMonth"
                required>

        </div>


        <div class="form-group">

            <label>Units Consumed</label>

            <input
                type="number"
                id="units"
                min="0"
                step="0.01"
                placeholder="e.g. 150"
                required>

        </div>


        <button
            type="button"
            class="btn btn-primary"
            onclick="calculateBill()">

            Calculate Bill

        </button>

    </div>


    <div id="resultCard" class="card result hidden">

        <div class="eyebrow">
            CALCULATED BILL
        </div>

        <div class="result-amount" id="resultAmount">
            ₹0.00
        </div>

        <p class="description" id="resultDescription"></p>

        <button
            class="secondary"
            onclick="saveBill()">

            Save Bill

        </button>

    </div>

</div>

</main>

<script src="js/script.js"></script>

</body>
</html>