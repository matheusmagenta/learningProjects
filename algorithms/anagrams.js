et dictionary = ['stairs', 'guardian', 'sraits']
let query = 'stairs'
let queries = ['stairs', 'guardina']


let countLetterFrequency = function(word){
  let querySplitted = []
  let queryLetterList = {}
  let counter = 1
  
  // split word
  querySplitted = word.split('').sort()
  //console.log(querySplitted)
  
  // iterate over each letter
  for(let i = 0; i < querySplitted.length; i++){
   // insert letter and its counter in an object
    let currentLetter = querySplitted[i]
     
    // check if letter already exists in object
    if(Object.keys(queryLetterList).includes(currentLetter)){
      //console.log('currentLetter:', currentLetter)
      //console.log('same letter:', Object.keys(queryLetterList).includes(currentLetter))
      queryLetterList[currentLetter]++    
    }
    if(!Object.keys(queryLetterList).includes(currentLetter)){
      //console.log('currentLetter:', currentLetter)
      queryLetterList[currentLetter] = 1     
    } 
    
     
  }
  return queryLetterList
  //console.log(queryLetterList)
}
let compareFrequency = function(word1, word2){
  let a = countLetterFrequency(word1)
  let b = countLetterFrequency(word2)
  return JSON.stringify(a) === JSON.stringify(b)
}

let countAnagrams = function(word, dictionary) {
 let countingAnagrams = 0;   
 dictionary.map((entry) => {
     if(compareFrequency(word, entry) === true){
        countingAnagrams++
     }
  })
  console.log(`${word} has ${countingAnagrams} anagrams`)
       
}
 
countAnagrams(query, dictionary)
