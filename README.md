## 📑 PROJECT

A webpage that can search OMDB for movies, and allow the user to save their favourite films  
https://pictamovie.netlify.app/ (in progress)

---

## ✏️ WIREFRAMING

<img src="./src/utils/images/wireframing.PNG" width=500>

---

## 🎨 UI

#### - MAIN

<img src="./src/utils/images/main.PNG" width=1200>

---

#### - SEARCH

<img src="./src/utils/images/search.PNG" width=700>

---

#### - MODAL

<img src="./src/utils/images/popup1.PNG" width=500>

---

#### - MODAL (custom image for empty posters)

<img src="./src/utils/images/popup2.PNG" width=500>   
  
---

## 🔮 FEATURE

Search OMDB and display the results (movies only)
Add a movie from the search results to our nomination list
View the list of films already nominated
Remove a nominee from the nomination list

---

## 📎 PLAN

#### STACK

React, HTML, CSS, Heroku

#### STEP

- Search results come from OMDB's API
- Each search result lists information of the movie (title, year of release and a button to nominate that film)
- Updates to the search terms updates the result list
- Movies in search results can be added and removed from the nomination list
- If a search result has already been nominated, disable its nominate button
- Display a banner when the user has 5 nominations

---

## 💡 PROBLEM SOLVING RECORD

- [x] The main page is empty ((before the user searches any movie)  
       => Display pre-loaded movie list

- [x] Some movie data has no posters, and N/A values  
       => Replace empty posters with custom poster, and error messages

- [x] Scroll bar relocates the elements  
       => Set width: 100% and margin: auto 0

- [x] Input text limit  
       => Set input maxLength

- [x] heroku error  
       => free deployment limit exceeded  
       => deploy on netlify
- [x] github push rejected after adding README file on Github  
       => git pull origin master

- [x] how to import images in public folder in react?

      <img src={process.env.PUBLIC_URL + '/yourPathHere.jpg'} />
      <img src={window.location.origin + '/yourPathHere.jpg'} />

- [x] API key privacy issue
      => saved it in .env file

- [x] using multiple dynamic className  
       => [styles.description, styles.hr].join(' ')]
