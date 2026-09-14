/* =====================================================
   THOMSON CLINIC
   HOMEPAGE JAVASCRIPT
===================================================== */


/* =====================================================
   FAQ ACCORDION
===================================================== */

function initializeFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!faqItems.length) return;


    faqItems.forEach(
        item => {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            const answer =
                item.querySelector(
                    ".faq-answer"
                );


            if (!question || !answer) {
                return;
            }


            question.addEventListener(
                "click",
                () => {

                    const active =
                        item.classList.contains(
                            "active"
                        );


                    /* Close all FAQ items */

                    faqItems.forEach(
                        other => {

                            other.classList.remove(
                                "active"
                            );


                            const otherAnswer =
                                other.querySelector(
                                    ".faq-answer"
                                );


                            if (otherAnswer) {

                                otherAnswer.style
                                    .maxHeight = null;

                            }

                        }
                    );


                    /* Open selected FAQ */

                    if (!active) {

                        item.classList.add(
                            "active"
                        );


                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    }

                }
            );

        }
    );

}


/* =====================================================
   START HOMEPAGE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeFAQ();

    }
);