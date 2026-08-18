/* =========================================================
   GET ELEMENTS
========================================================= */

const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");

const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const score = document.getElementById("score");
const modelName = document.getElementById("modelName");
const riskStatus = document.getElementById("riskStatus");
const statusIcon = document.getElementById("statusIcon");

const scoreCircle =
    document.querySelector(".score-circle");


/* =========================================================
   GET FORM DATA
========================================================= */

function getFormData() {

    return {

        age: Number(
            document.getElementById("age").value
        ),

        sex:
            document.getElementById("sex").value,

        job: Number(
            document.getElementById("job").value
        ),

        housing:
            document.getElementById("housing").value,

        saving:
            document.getElementById("saving").value,

        checking:
            document.getElementById("checking").value,

        credit: Number(
            document.getElementById("credit").value
        ),

        duration: Number(
            document.getElementById("duration").value
        ),

        purpose:
            document.getElementById("purpose").value

    };

}


/* =========================================================
   VALIDATION
========================================================= */

function validateForm(data) {

    if (
        !data.age ||
        !data.sex ||
        isNaN(data.job) ||
        !data.housing ||
        !data.saving ||
        !data.checking ||
        !data.credit ||
        !data.duration ||
        !data.purpose
    ) {

        alert(
            "Please complete all applicant and loan information."
        );

        return false;
    }


    if (data.age < 18 || data.age > 100) {

        alert(
            "Please enter an age between 18 and 100."
        );

        return false;
    }


    if (data.credit <= 0) {

        alert(
            "Credit amount must be greater than zero."
        );

        return false;
    }


    if (data.duration <= 0) {

        alert(
            "Loan duration must be greater than zero."
        );

        return false;
    }


    return true;
}


/* =========================================================
   DISPLAY RESULT
========================================================= */

function displayResult(result) {

    resultCard.classList.remove(
        "good",
        "bad"
    );


    /* ================= GOOD ================= */

    if (result.prediction === "GOOD") {

        resultCard.classList.add("good");

        resultTitle.textContent =
            "Good Credit Risk";

        resultMessage.textContent =
            "The machine learning model predicts that this applicant has a comparatively lower credit-risk profile.";

        riskStatus.textContent =
            "Good Risk";

        statusIcon.textContent =
            "✓";

        statusIcon.style.background =
            "#dcfce7";

        statusIcon.style.color =
            "#15803d";

    }


    /* ================= BAD ================= */

    else {

        resultCard.classList.add("bad");

        resultTitle.textContent =
            "Bad Credit Risk";

        resultMessage.textContent =
            "The machine learning model predicts that this applicant may represent a comparatively higher credit-risk profile.";

        riskStatus.textContent =
            "Bad Risk";

        statusIcon.textContent =
            "!";

        statusIcon.style.background =
            "#fee2e2";

        statusIcon.style.color =
            "#dc2626";

    }


    /* ================= SCORE ================= */

    const confidence =
        Number(result.confidence);

    score.textContent =
        confidence.toFixed(1) + "%";


    /* ================= MODEL ================= */

    modelName.textContent =
        result.model;


    /* ================= SCORE CIRCLE ================= */

    const degrees =
        confidence * 3.6;

    let circleColor;

    if (result.prediction === "GOOD") {

        circleColor =
            "#16a34a";

    } else {

        circleColor =
            "#dc2626";
    }


    scoreCircle.style.background =

        `conic-gradient(
            ${circleColor} 0deg,
            ${circleColor} ${degrees}deg,
            #e5e7eb ${degrees}deg
        )`;
}


/* =========================================================
   PREDICT BUTTON
========================================================= */

predictBtn.addEventListener(
    "click",
    async function() {

        const data =
            getFormData();


        if (!validateForm(data)) {

            return;
        }


        /* Loading state */

        predictBtn.disabled =
            true;

        predictBtn.innerHTML =
            "Analyzing Application...";


        try {

            /* Send data to Flask */

            const response =
                await fetch(
                    "/predict",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const result =
                await response.json();


            /* Handle error */

            if (!response.ok ||
                !result.success) {

                throw new Error(
                    result.error ||
                    "Prediction failed."
                );
            }


            /* Display actual ML result */

            displayResult(result);


            /* Scroll to result */

            resultCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        } catch (error) {

            console.error(error);

            alert(
                "Unable to get prediction.\n\n" +
                error.message
            );

        }


        /* Restore button */

        predictBtn.disabled =
            false;

        predictBtn.innerHTML =
            "<span>✦</span> Predict Credit Risk";

    }
);


/* =========================================================
   RESET BUTTON
========================================================= */

resetBtn.addEventListener(
    "click",
    function() {

        document.getElementById("age").value =
            "";

        document.getElementById("sex").value =
            "";

        document.getElementById("job").value =
            "";

        document.getElementById("housing").value =
            "";

        document.getElementById("saving").value =
            "";

        document.getElementById("checking").value =
            "";

        document.getElementById("credit").value =
            "";

        document.getElementById("duration").value =
            "";

        document.getElementById("purpose").value =
            "";


        /* Reset result */

        resultCard.classList.remove(
            "good",
            "bad"
        );


        resultTitle.textContent =
            "Awaiting Assessment";


        resultMessage.textContent =
            'Enter applicant information and click "Predict Credit Risk" to generate an assessment.';


        score.textContent =
            "--";


        modelName.textContent =
            "ML Model";


        riskStatus.textContent =
            "Waiting";


        statusIcon.textContent =
            "AI";


        statusIcon.style.background =
            "#eff6ff";


        statusIcon.style.color =
            "#2563eb";


        scoreCircle.style.background =

            `conic-gradient(
                #2563eb 0deg,
                #2563eb 0deg,
                #e5e7eb 0deg
            )`;

    }
);