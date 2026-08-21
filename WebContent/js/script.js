// ========================================
// TOAST NOTIFICATIONS
// ========================================

function showToast(message, type = "success") {

    const container =
        document.getElementById(
            "toastContainer"
        );

    // If the current page doesn't have
    // the toast container, use alert as fallback

    if (!container) {

        alert(message);

        return;
    }


    const toast =
        document.createElement("div");


    toast.className =
        `toast ${type}`;


    const icon =
        type === "success"
            ? "✓"
            : "⚠";


    toast.innerHTML = `

        <span class="toast-icon">
            ${icon}
        </span>

        <span>
            ${message}
        </span>

    `;


    container.appendChild(toast);


    setTimeout(
        function () {

            toast.style.animation =
                "toastOut 0.35s ease";


            setTimeout(
                function () {

                    toast.remove();

                },
                350
            );

        },
        3000
    );
}

// ========================================
// ELECTRICITY BILL CALCULATOR
// FRONTEND APPLICATION
// ========================================


// ========================================
// STORAGE HELPERS
// ========================================

function getUser() {
    return JSON.parse(
        localStorage.getItem("electricityUser")
    );
}

function saveUser(user) {
    localStorage.setItem(
        "electricityUser",
        JSON.stringify(user)
    );
}

function getBills() {
    return JSON.parse(
        localStorage.getItem("electricityBills")
    ) || [];
}

function setBills(bills) {
    localStorage.setItem(
        "electricityBills",
        JSON.stringify(bills)
    );
}

function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}


// ========================================
// REGISTER
// ========================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();

            const username =
                document
                    .getElementById("regUsername")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("regPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;

            const error =
                document.getElementById(
                    "registerError"
                );


            // Clear previous error

            error.classList.add("hidden");


            // Validate name

            if (fullName.length < 2) {

                error.textContent =
                    "⚠ Please enter your full name.";

                error.classList.remove("hidden");

                return;
            }


            // Validate username

            if (username.length < 3) {

                error.textContent =
                    "⚠ Username must contain at least 3 characters.";

                error.classList.remove("hidden");

                return;
            }


            // Validate password

            if (password.length < 4) {

                error.textContent =
                    "⚠ Password must contain at least 4 characters.";

                error.classList.remove("hidden");

                return;
            }


            // Confirm password

            if (password !== confirmPassword) {

                error.textContent =
                    "⚠ Passwords do not match.";

                error.classList.remove("hidden");

                return;
            }


            // Check whether account already exists

            const existingUser = getUser();

            if (
                existingUser &&
                existingUser.username === username
            ) {

                error.textContent =
                    "⚠ This username already exists.";

                error.classList.remove("hidden");

                return;
            }


            // Create user

            const user = {

                fullName: fullName,

                username: username,

                password: password

            };


            saveUser(user);


            // Send user to login

            window.location.href =
                "login.html";

        }
    );
}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;

            const error =
                document.getElementById(
                    "loginError"
                );


            error.classList.add("hidden");


            const user = getUser();


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

                error.textContent =
                    "⚠ Invalid username or password.";

                error.classList.remove(
                    "hidden"
                );

            }

        }
    );
}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
        "login.html";
}


// ========================================
// PAGE PROTECTION
// ========================================

function protectPage() {

    if (!isLoggedIn()) {

        window.location.href =
            "login.html";

        return false;
    }

    return true;
}


// ========================================
// DASHBOARD
// ========================================

if (
    window.location.pathname.endsWith(
        "dashboard.html"
    )
) {

    if (protectPage()) {

        const user = getUser();


        if (user) {

            const welcomeUser =
                document.getElementById(
                    "welcomeUser"
                );

            const navUser =
                document.getElementById(
                    "navUser"
                );


            if (welcomeUser) {

                welcomeUser.textContent =
                    user.fullName;
            }


            if (navUser) {

                navUser.textContent =
                    user.fullName;
            }

        }


        loadDashboard();

    }
}


// ========================================
// LOAD DASHBOARD
// ========================================

function loadDashboard() {

    const bills = getBills();


    const monthCount =
        document.getElementById(
            "monthCount"
        );

    const totalBill =
        document.getElementById(
            "totalBill"
        );

    const averageBill =
        document.getElementById(
            "averageBill"
        );

    const history =
        document.getElementById(
            "billHistory"
        );


    if (!monthCount || !totalBill || !averageBill) {
        return;
    }


    // Number of saved months

    monthCount.textContent =
        bills.length;


    // Total bill

    const total =
        bills.reduce(
            function (sum, bill) {

                return sum + bill.amount;

            },
            0
        );


    // Average

    const average =
        bills.length > 0
            ? total / bills.length
            : 0;


    totalBill.textContent =
        "₹" + total.toFixed(2);

    averageBill.textContent =
        "₹" + average.toFixed(2);


    // No bills

    if (bills.length === 0) {

        history.innerHTML = `

            <div class="card empty">

                <div class="empty-icon">
                    ⚡
                </div>

                <h3>
                    No bills saved yet
                </h3>

                <p>
                    Your saved monthly bills
                    will appear here.
                </p>

            </div>

        `;

        return;
    }


    // Display bills

    history.innerHTML =
        bills
            .slice()
            .reverse()
            .map(
                function (bill) {

                    return `

                        <div class="card bill">

                            <div>

                                <div class="bill-month">
                                    ${formatMonth(
                                        bill.month
                                    )}
                                </div>

                                <div class="bill-units">
                                    ${bill.units}
                                    units consumed
                                </div>

                            </div>

                            <div class="bill-amount">
                                ₹${bill.amount.toFixed(2)}
                            </div>

                        </div>

                    `;

                }
            )
            .join("");
}


// ========================================
// FORMAT MONTH
// ========================================

function formatMonth(month) {

    const date =
        new Date(
            month + "-01"
        );


    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric"
        }
    );
}


// ========================================
// BILL CALCULATION
// ========================================

let calculatedAmount = 0;


function calculateBill() {

    const month =
        document.getElementById(
            "billingMonth"
        ).value;

    const units =
        parseFloat(
            document.getElementById(
                "units"
            ).value
        );


    const error =
        document.getElementById(
            "calcError"
        );

    const resultCard =
        document.getElementById(
            "resultCard"
        );


    error.classList.add(
        "hidden"
    );


    // Validate month

    if (!month) {

        error.textContent =
            "⚠ Please select a billing month.";

        error.classList.remove(
            "hidden"
        );

        return;
    }


    // Validate units

    if (
        isNaN(units) ||
        units < 0
    ) {

        error.textContent =
            "⚠ Please enter valid units consumed.";

        error.classList.remove(
            "hidden"
        );

        return;
    }


    // ====================================
    // SLAB CALCULATION
    // ====================================

    if (units <= 50) {

        calculatedAmount =
            units * 3.50;

    }

    else if (units <= 150) {

        calculatedAmount =
            (50 * 3.50) +
            ((units - 50) * 4.00);

    }

    else if (units <= 250) {

        calculatedAmount =
            (50 * 3.50) +
            (100 * 4.00) +
            ((units - 150) * 5.20);

    }

    else {

        calculatedAmount =
            (50 * 3.50) +
            (100 * 4.00) +
            (100 * 5.20) +
            ((units - 250) * 6.50);

    }


    // Display result

    document.getElementById(
        "resultAmount"
    ).textContent =
        "₹" +
        calculatedAmount.toFixed(2);


    document.getElementById(
        "resultDescription"
    ).textContent =
        `${units} units for ${formatMonth(month)}`;


    resultCard.classList.remove(
        "hidden"
    );


    // Smooth scroll

    setTimeout(
        function () {

            resultCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        },
        100
    );
}


// ========================================
// SAVE BILL
// ========================================

function saveBill() {

    const month =
        document.getElementById(
            "billingMonth"
        ).value;

    const units =
        parseFloat(
            document.getElementById(
                "units"
            ).value
        );


    const bills = getBills();


    // Prevent duplicate month

    const alreadyExists =
        bills.some(
            function (bill) {

                return bill.month === month;

            }
        );


    if (alreadyExists) {

        showToast(
    "A bill for this month has already been saved.",
    "error"
);

        return;
    }


    // Save

    bills.push({

        month: month,

        units: units,

        amount: calculatedAmount

    });


    setBills(bills);


    showToast(
    "Bill successfully saved!",
    "success"
);


    window.location.href =
        "dashboard.html";
}


// ========================================
// CALCULATE PAGE
// ========================================

if (
    window.location.pathname.endsWith(
        "calculate.html"
    )
) {

    if (protectPage()) {

        const user = getUser();


        if (user) {

            const navUser =
                document.getElementById(
                    "navUser"
                );


            if (navUser) {

                navUser.textContent =
                    user.fullName;

            }

        }

    }
}