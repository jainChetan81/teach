/* teach — shared quiz widget.

   Markup contract (styles live in assets/style.css):

     <div class="quiz" data-answer="b">
       <p class="quiz-q">Question text</p>
       <div class="quiz-opts">
         <button data-k="a">Option one</button>
         <button data-k="b">Option two</button>
       </div>
       <p class="quiz-fb"></p>
     </div>

   Optional per-quiz feedback overrides:
     data-right="..."  shown on a correct pick
     data-wrong="..."  shown on a wrong pick

   Retrieval practice only works if a wrong answer can be retried, so the
   widget never locks. It clears previous marks on every click. */

(function () {
  var RIGHT = "Correct.";
  var WRONG = "Not quite. Reread the section above, then try again.";

  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var answer = quiz.getAttribute("data-answer");
    var fb = quiz.querySelector(".quiz-fb");
    var right = quiz.getAttribute("data-right") || RIGHT;
    var wrong = quiz.getAttribute("data-wrong") || WRONG;
    var buttons = quiz.querySelectorAll(".quiz-opts button");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var correct = btn.getAttribute("data-k") === answer;
        buttons.forEach(function (b) { b.classList.remove("correct", "wrong"); });
        btn.classList.add(correct ? "correct" : "wrong");
        if (fb) fb.textContent = correct ? right : wrong;
      });
    });
  });
})();
