const createElements=(arr)=>{
const htmlElements =arr.map((el)=>`<span class="btn">${el}</span>`)
return htmlElements.join("");
}

//===========button-container=============

const levelPost = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(reply => {
            // ✅ The API response contains an object. 
            // The actual array of levels is inside data.data
            postDisplay(reply.data); 
        })
}

const removeActive=()=>{
  const lessonButtons=document.querySelectorAll(".lesson-btn")
  console.log(lessonButtons)
  lessonButtons.forEach((btn)=>btn.classList.remove("active"));
}


//====word-sound======
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

//===========word-container=============

const loadLevelWord=(id)=>{
    
 const url=`https://openapi.programming-hero.com/api/level/${id}`;
 console.log(url)

  fetch(url)
 .then(reaction=> reaction.json())
 .then((info )=>{
  removeActive();
  const clickBtn =document.querySelector(`#lesson-btn-${id} .lesson-btn`);
  clickBtn.classList.add("active")
  displayLevelWord(info.data)
 })
}




//================================================
const loadWordDetail=(id)=>{
  const url1 =`https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url1)
  .then(reply=>reply.json())
  .then(details=> displayWordDetails(details.data))

}
//======================================
const displayWordDetails=(word)=>{
  console.log(word)
  const detailsContainer= document.getElementById("details-container");
  detailsContainer.innerHTML=`
  <div class="">
        <h1 class="text-3xl font-bold bangla">${word.word} ( <i class="fa-solid fa-microphone"></i>:${word.pronunciation} )</h1>
      </div>
      <div class="">
        <h1 class="text-2xl font-bold">Meaning</h1>
        <p class="font-bangla text-[25px] font-medium text-gray-500">${word.meaning} </p>
      </div>
      <div class="">
        <h1 class="text-2xl font-bold">Example</h1>
        <p class="font-bangla text-[18px] font-medium text-gray-500">${word.sentence}</p>
      </div>
      <div class="space-y-3  ">
        <h1 class="text-2xl font-bold">Synonyms</h1>
        <div class="flex gap-4">  ${createElements(word.synonyms)}</div>
      </div>
  `;
  document.getElementById("my_modal").showModal();

}








const displayLevelWord=(words)=>{
 const wordContainer=document.getElementById("word-container")
 wordContainer.innerHTML="";

 if(words.length == 0){
wordContainer.innerHTML=` <div class=" text-center  col-span-full space-y-10 my-7">
         <img src="./assets/image 1.png" class="mx-auto" 
        alt="">
        <p class="font-bangla text-[18px] font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
        <h2 class="text-4xl font-bold text-center">নেক্সট Lesson এ যান</h2>
      </div>
      `;
    return; 
 }
  

   words.forEach((word)=>{
    console.log(word);
         const wordDiv= document.createElement('div')
         wordDiv.innerHTML=`
           <div class="text-center space-y-4 bg-white rounded-xl py-10 px-5">
 
  <h2 class="text-2xl font-bold"> ${word.word? word.word:"শব্দ পাওয়া যায় নি "} </h2>
  
 
  <p class="text-[20px] font-medium">Meaning /Pronunciations</p>
  
  
  <h2 class="font-bangla text-3xl font-semibold text-[#434348]">"${word.meaning? word.meaning: "অর্থ পাওয়া যায় নি"}/ ${word.pronunciation? word.pronunciation:"pronunciation পাওয়া যায় নি"}"</h2>
  
 
  <div class="flex justify-between">
    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff]">
      <i class="fa-solid fa-circle-info"></i>
    </button>
    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff]">
      <i class="fa-solid fa-volume-high"></i>
    </button>
  </div>
</div>
         `
 wordContainer.append(wordDiv)
   })
}

//===========button-container=============

const postDisplay = (learns) => {
    const levelContainer = document.getElementById("level-container");
    // Clear the container before adding new elements
    levelContainer.innerHTML = "";

    // ✅ Now learns is an array, so forEach will work
    learns.forEach((lesson) => {
        const levelDiv = document.createElement('div');
        levelDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" 
            onclick="loadLevelWord(${lesson.level_no})">
                <a class="btn btn-outline btn-primary lesson-btn">
                    <i class="fa-solid fa-book-open"></i> Learn - ${lesson.level_no}
                </a>
            </button>
        `;
        // Append each new div to the container
        levelContainer.append(levelDiv);
    })
}

// Call the function to load and display levels
levelPost();


document.getElementById("input-btn").addEventListener("click", () => {
  const input = document.getElementById("input-box");
  const searchValue = input.value.trim().toLowerCase(); 
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
      const allWords = data.data;
      console.log(allWords);

      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );

      displayLevelWord(filterWords);
    });
});


