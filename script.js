/* =========================
   Page Load Animation
========================= */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");

});


/* =========================
   Scroll Animation
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});
// =========================
// Menu Filter
// =========================

const filterButtons = document.querySelectorAll(".menu-filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;


        // Remove active class
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });


        // Add active class
        button.classList.add("active");


        // Filter cards
        menuCards.forEach((card) => {

            const cardCategory = card.dataset.category;

            if (
                category === "all" ||
                category === cardCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PAGE LOAD ANIMATION
    ========================================= */

    document.body.classList.add("page-loaded");


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================
       MENU FILTER
    ========================================= */

    const filterButtons =
        document.querySelectorAll(".menu-filter-btn");

    const menuCards =
        document.querySelectorAll(".menu-card");


    if (filterButtons.length && menuCards.length) {

        filterButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const category =
                    button.dataset.category;


                filterButtons.forEach((btn) => {
                    btn.classList.remove("active");
                });


                button.classList.add("active");


                menuCards.forEach((card) => {

                    const cardCategory =
                        card.dataset.category;


                    if (
                        category === "all" ||
                        category === cardCategory
                    ) {

                        card.style.display = "block";

                        setTimeout(() => {
                            card.classList.add("menu-card-visible");
                        }, 10);

                    } else {

                        card.classList.remove("menu-card-visible");

                        card.style.display = "none";
                    }

                });

            });

        });

    }


    /* =========================================
       CUSTOM CATERING FORM
    ========================================= */

    const customForm =
        document.querySelector(".custom-form");


    if (customForm) {

        customForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const submitButton =
                customForm.querySelector(".custom-submit");


            submitButton.textContent =
                "Request Sent ✓";


            submitButton.style.backgroundColor =
                "#4b8f70";


            customForm.reset();


            setTimeout(() => {

                submitButton.textContent =
                    "Request Custom Quote →";

                submitButton.style.backgroundColor =
                    "";

            }, 3000);

        });

    }


    /* =========================================
       SERVICE CARD HOVER
    ========================================= */

    const serviceCards =
        document.querySelectorAll(
            ".service-card, .corporate-service, .custom-option"
        );


    serviceCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.setProperty(
                "--card-scale",
                "1"
            );

        });

    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                targetId === "#" ||
                !targetId
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       BUTTON RIPPLE EFFECT
    ========================================= */

    const buttons =
        document.querySelectorAll(
            ".btn-primary, .quote-btn, .corporate-btn, .party-primary, .custom-primary, .custom-submit"
        );


    buttons.forEach((button) => {

        button.addEventListener("click", function () {

            this.classList.add("button-clicked");


            setTimeout(() => {

                this.classList.remove("button-clicked");

            }, 400);

        });

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll(".party-step");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    steps.forEach((step) => {
        observer.observe(step);
    });

});
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("paymentForm");

    const methodButtons = document.querySelectorAll(".payment-method");

    const panels = {
        card: document.getElementById("cardPanel"),
        wallet: document.getElementById("walletPanel"),
        fawry: document.getElementById("fawryPanel"),
        bank: document.getElementById("bankPanel"),
        deposit: document.getElementById("depositPanel")
    };

    const payButtonText = document.getElementById("payButtonText");
    const depositAmount = document.getElementById("depositAmount");
    const remainingAmount = document.getElementById("remainingAmount");
    const summaryList = document.getElementById("summaryList");
    const orderSubtitle = document.getElementById("orderSubtitle");
    const totalAmountEl = document.getElementById("totalAmount");

    let currentMethod = "card";
    let selectedWallet = null;


    // =========================
    // LOAD THE REAL ORDER FROM THE MENU PAGE
    // =========================

    let orderItems = [];
    let total = 0;

    try {
        const stored = localStorage.getItem("antixorCart");

        if (stored) {
            const cart = JSON.parse(stored);
            orderItems = Array.isArray(cart.items) ? cart.items : [];
            total = parseFloat(cart.total) || 0;
        }
    } catch (e) {
        orderItems = [];
        total = 0;
    }

    // 30% deposit, demo default — adjust the ratio here if needed
    const deposit = Math.round(total * 0.3 * 100) / 100;


    // =========================
    // MONEY FORMAT ($ — matches the menu page prices)
    // =========================

    function money(value) {
        return `$${value.toFixed(2)}`;
    }


    // =========================
    // RENDER ORDER SUMMARY
    // =========================

    function renderOrderSummary() {

        if (orderItems.length === 0) {

            if (summaryList) {
                summaryList.innerHTML =
                    '<div class="empty-cart">' +
                    '<p>No items selected yet.</p>' +
                    '<a href="menu.html">← Choose from the menu</a>' +
                    '</div>';
            }

            if (orderSubtitle) {
                orderSubtitle.textContent = "No items selected";
            }

            if (totalAmountEl) {
                totalAmountEl.textContent = money(0);
            }

            return;
        }

        if (summaryList) {
            summaryList.innerHTML = orderItems.map((item) => {
                const safeName = String(item.name || "Item")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                return (
                    "<div>" +
                    "<span>" + safeName + "</span>" +
                    "<strong>" + money(parseFloat(item.price) || 0) + "</strong>" +
                    "</div>"
                );
            }).join("");
        }

        if (orderSubtitle) {
            orderSubtitle.textContent =
                orderItems.length + (orderItems.length > 1 ? " items selected" : " item selected");
        }

        if (totalAmountEl) {
            totalAmountEl.textContent = money(total);
        }
    }

    renderOrderSummary();


    // =========================
    // UPDATE PAY BUTTON
    // =========================

    function updatePaymentButton() {

        if (currentMethod === "deposit") {

            payButtonText.textContent =
                `Pay ${money(deposit)}`;

        } else if (currentMethod === "bank") {

            payButtonText.textContent =
                "Confirm Bank Transfer";

        } else if (currentMethod === "fawry") {

            payButtonText.textContent =
                "Request Fawry Reference";

        } else {

            payButtonText.textContent =
                `Pay ${money(total)}`;
        }
    }


    // =========================
    // PAYMENT METHODS
    // =========================

    methodButtons.forEach((button) => {

        button.addEventListener("click", () => {

            currentMethod = button.dataset.method;

            // Remove active
            methodButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            // Add active
            button.classList.add("active");


            // Hide all panels
            Object.values(panels).forEach((panel) => {

                if (panel) {
                    panel.classList.remove("active");
                }

            });


            // Show selected panel
            if (panels[currentMethod]) {
                panels[currentMethod].classList.add("active");
            }


            updatePaymentButton();

        });

    });


    // =========================
    // WALLET SELECTION
    // =========================

    const walletButtons = document.querySelectorAll(".wallet-option");

    walletButtons.forEach((button) => {

        button.addEventListener("click", () => {

            selectedWallet = button.dataset.wallet;

            walletButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

        });

    });


    // =========================
    // CARD NUMBER FORMAT
    // =========================

    const cardNumber =
        document.getElementById("cardNumber");

    if (cardNumber) {

        cardNumber.addEventListener("input", (event) => {

            let value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 16);

            value =
                value.replace(
                    /(\d{4})(?=\d)/g,
                    "$1 "
                );

            event.target.value = value;

        });

    }


    // =========================
    // EXPIRY DATE
    // =========================

    const expiry =
        document.getElementById("expiry");

    if (expiry) {

        expiry.addEventListener("input", (event) => {

            let value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

            if (value.length >= 3) {

                value =
                    value.slice(0, 2) +
                    " / " +
                    value.slice(2);

            }

            event.target.value = value;

        });

    }


    // =========================
    // CVV
    // =========================

    const cvv =
        document.getElementById("cvv");

    if (cvv) {

        cvv.addEventListener("input", (event) => {

            event.target.value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

        });

    }


    // =========================
    // DEPOSIT
    // =========================

    if (depositAmount) {
        depositAmount.textContent =
            money(deposit);
    }

    if (remainingAmount) {
        remainingAmount.textContent =
            money(total - deposit);
    }


    // =========================
    // FORM SUBMIT
    // =========================

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if (orderItems.length === 0) {
            alert("Your order is empty. Please choose items from the menu first.");
            window.location.href = "menu.html";
            return;
        }


        // HTML validation
        if (!form.checkValidity()) {

            form.reportValidity();

            return;
        }


        // =========================
        // CARD VALIDATION
        // =========================

        if (currentMethod === "card") {

            const cardValue =
                cardNumber.value.replace(/\s/g, "");


            if (cardValue.length < 12) {

                alert(
                    "Please enter a valid card number."
                );

                cardNumber.focus();

                return;
            }


            if (expiry.value.length < 7) {

                alert(
                    "Please enter the card expiry date."
                );

                expiry.focus();

                return;
            }


            if (cvv.value.length < 3) {

                alert(
                    "Please enter the CVV."
                );

                cvv.focus();

                return;
            }

        }


        // =========================
        // WALLET VALIDATION
        // =========================

        if (currentMethod === "wallet") {

            if (!selectedWallet) {

                alert(
                    "Please choose a wallet provider."
                );

                return;
            }

            const walletNumber =
                document.getElementById("walletNumber");


            if (
                walletNumber &&
                walletNumber.value.trim().length < 10
            ) {

                alert(
                    "Please enter a valid wallet phone number."
                );

                walletNumber.focus();

                return;
            }

        }


        // =========================
        // BUTTON LOADING
        // =========================

        const button =
            document.querySelector(".pay-button");

        button.classList.add("loading");

        payButtonText.textContent =
            "Processing...";


        // Demo processing
        setTimeout(() => {

            button.classList.remove("loading");

            payButtonText.textContent =
                "Payment Ready ✓";


            const modal =
                document.getElementById("successModal");

            if (modal) {
                modal.classList.add("show");
            }

            // Clear the cart once the (demo) order is placed
            localStorage.removeItem("antixorCart");

        }, 1000);

    });


    // =========================
    // SUCCESS MODAL
    // =========================

    const modal =
        document.getElementById("successModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalOk =
        document.getElementById("modalOk");


    function hideModal() {

        if (modal) {
            modal.classList.remove("show");
        }

        updatePaymentButton();
    }


    if (closeModal) {
        closeModal.addEventListener(
            "click",
            hideModal
        );
    }


    if (modalOk) {

        modalOk.addEventListener(
            "click",
            () => {
                window.location.href = "index.html";
            }
        );

    }


    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                hideModal();
            }

        });

    }


    // =========================
    // INITIALIZE
    // =========================

    updatePaymentButton();

});
// =========================================================
// NAVBAR — add this to script.js (or include as its own file
// on every page, after the header markup)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Sticky header shadow on scroll
    const header = document.getElementById("siteHeader");

    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 10);
        });
    }


    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
        });

        // Close the mobile menu when a link inside it is clicked
        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mobileMenu.classList.remove("active");
            });
        });
    }


    // Expandable search
    const navSearch = document.getElementById("navSearch");
    const searchToggle = document.getElementById("searchToggle");
    const searchInput = document.getElementById("searchInput");

    if (navSearch && searchToggle && searchInput) {
        searchToggle.addEventListener("click", () => {
            navSearch.classList.toggle("active");

            if (navSearch.classList.contains("active")) {
                searchInput.focus();
            }
        });

        document.addEventListener("click", (event) => {
            if (!navSearch.contains(event.target)) {
                navSearch.classList.remove("active");
            }
        });

        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && searchInput.value.trim()) {
                window.location.href = "menu.html?search=" + encodeURIComponent(searchInput.value.trim());
            }
        });
    }


    // Highlight the current page in both the desktop and mobile nav
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
        const linkPage = link.getAttribute("href").split("#")[0];

        if (linkPage === currentPage) {
            link.classList.add("current");
        }
    });

});

// =========================================================
// FOOTER — add this to script.js
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Back to top button
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("visible", window.scrollY > 400);
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    // Newsletter form (client-side only — connect to your email
    // provider, e.g. Mailchimp/Klaviyo, to actually collect emails)
    const newsletterForm = document.getElementById("newsletterForm");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const emailInput = document.getElementById("newsletterEmail");
            const button = newsletterForm.querySelector("button");

            if (!emailInput.value.trim()) {
                return;
            }

            button.textContent = "Subscribed ✓";
            newsletterForm.classList.add("subscribed");
        });
    }

});
// =========================================================
// BACK TO TOP — standalone, add anywhere in script.js.
// Not connected to the footer at all.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    // Show the button once the user has scrolled down a bit
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 400);
    });

    // Smooth scroll back to the top on click
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

})



document.addEventListener("DOMContentLoaded", function () {

    const veloraIntro = document.getElementById("veloraIntro");

    if (veloraIntro) {

        setTimeout(function () {
            veloraIntro.classList.add("hide");
        }, 3000);

    }

});
    // باقي كودك القديم هنا

    const heroVideo = document.getElementById("heroVideo");

if (heroVideo) {

    heroVideo.addEventListener("ended", function () {

        setTimeout(function () {
            heroVideo.currentTime = 0;
            heroVideo.play();
        }, 2000);

    });

}