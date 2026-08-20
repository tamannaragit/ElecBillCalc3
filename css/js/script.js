// ================================
// USER / AUTHENTICATION
// ================================

function getUser() {
    return JSON.parse(localStorage.getItem("electricityUser"));
}

function getBills() {
    return JSON.parse(localStorage.getItem("electricityBills")) || [];
}

function setBills(bills) {
    localStorage.setItem("electricityBills", JSON.stringify(bills));
}


// ================================
// REGISTER
// ================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const username =
            document.getElementById("regUsername").value.trim();

        const password =
            document.getElementById("regPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const error =
            document.getElementById("registerError");


        if (password !== confirmPassword) {

            error.textContent =
                "⚠ Passwords do not match.";

            error.classList.remove("hidden");

            return;
        }


        const user = {
            fullName,
            username,
            password
        };


        localStorage.setItem(
            "electricityUser",
            JSON.stringify(user)
        );


        window.location.href = "login.html";

    });
}


// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        const user = getUser();

        const error =
            document.getElementById("loginError");


        if (
            user &&
            user.username === username &&
            user.password === password
        ) {

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            window.location.href =
                "dashboard.html";

        } else {

            error.classList.remove("hidden");

        }

    });
}


// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}


// ================================
// DASHBOARD
// ================================

if (
    window.location.pathname.endsWith("dashboard.html")
) {

    const user = getUser();

    if (!user || localStorage.getItem("loggedIn") !== "true") {

        window.location.href = "login.html";

    } else {

        const welcomeUser =
            document.getElementById("welcomeUser");

        const navUser =
            document.getElementById("navUser");

        welcomeUser.textContent =
            user.fullName;

        navUser.textContent =
            user.fullName;

        loadDashboard();

    }
}


function loadDashboard() {

    const bills = getBills();

    const monthCount =
        document.getElementById("monthCount");

    const totalBill =
        document.getElementById("totalBill");

    const averageBill =
        document.getElementById("averageBill");

    const history =
        document.getElementById("billHistory");


    monthCount.textContent =
        bills.length;


    const total =
        bills.reduce(
            (sum, bill) => sum + bill.amount,
            0
        );


    const average =
        bills.length > 0
            ? total / bills.length
            : 0;


    totalBill.textContent =
        "₹" + total.toFixed(2);

    averageBill.textContent =
        "₹" + average.toFixed(2);


    if (bills.length === 0) {

        history.innerHTML = `
            <div class="card empty">
                <div class="empty-icon">⚡</div>
                <h3>No bills saved yet</h3>
                <p>
                    Your saved monthly bills will appear here.
                </p>
            </div>
        `;

        return;
    }


    history.innerHTML =
        bills
        .slice()
        .reverse()
        .map(bill => `

            <div class="card bill">

                <div>

                    <div class="bill-month">
                        ${formatMonth(bill.month)}
                    </div>

                    <div class="bill-units">
                        ${bill.units} units consumed
                    </div>

                </div>

                <div class="bill-amount">
                    ₹${bill.amount.toFixed(2)}
                </div>

            </div>

        `)
        .join("");
}


function formatMonth(month) {

    const date =
        new Date(month + "-01");

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric"
        }
    );
}


// ================================
// BILL CALCULATION
// ================================

let calculatedAmount = 0;


function calculateBill() {

    const month =
        document.getElementById("billingMonth").value;

    const units =
        parseFloat(
            document.getElementById("units").value
        );

    const error =
        document.getElementById("calcError");

    const resultCard =
        document.getElementById("resultCard");


    error.classList.add("hidden");


    if (!month || isNaN(units) || units < 0) {

        error.textContent =
            "⚠ Please enter a valid billing month and units.";

        error.classList.remove("hidden");

        return;
    }


    // First 50 units → ₹3.50
    // Next 100 → ₹4.00
    // Next 100 → ₹5.20
    // Above 250 → ₹6.50

    if (units <= 50) {

        calculatedAmount =
            units * 3.50;

    } else if (units <= 150) {

        calculatedAmount =
            (50 * 3.50) +
            ((units - 50) * 4.00);

    } else if (units <= 250) {

        calculatedAmount =
            (50 * 3.50) +
            (100 * 4.00) +
            ((units - 150) * 5.20);

    } else {

        calculatedAmount =
            (50 * 3.50) +
            (100 * 4.00) +
            (100 * 5.20) +
            ((units - 250) * 6.50);
    }


    document.getElementById("resultAmount")
        .textContent =
        "₹" + calculatedAmount.toFixed(2);


    document.getElementById("resultDescription")
        .textContent =
        `${units} units for ${formatMonth(month)}`;


    resultCard.classList.remove("hidden");

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}


// ================================
// SAVE BILL
// ================================

function saveBill() {

    const month =
        document.getElementById("billingMonth").value;

    const units =
        parseFloat(
            document.getElementById("units").value
        );


    let bills = getBills();


    const alreadyExists =
        bills.some(
            bill => bill.month === month
        );


    if (alreadyExists) {

        alert(
            "A bill for this month has already been saved."
        );

        return;
    }


    bills.push({

        month: month,

        units: units,

        amount: calculatedAmount

    });


    setBills(bills);


    alert(
        "Bill successfully saved!"
    );


    window.location.href =
        "dashboard.html";
}


// ================================
// CALCULATE PAGE USER
// ================================

if (
    window.location.pathname.endsWith("calculate.html")
) {

    const user = getUser();

    if (
        !user ||
        localStorage.getItem("loggedIn") !== "true"
    ) {

        window.location.href =
            "login.html";

    } else {

        document.getElementById(
            "navUser"
        ).textContent = user.fullName;

    }
}