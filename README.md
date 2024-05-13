# COMP1004
<h3>HTML</h3>
- I achieved a rating of 100% accessibility score in Lighthouse, on both Mobile and Desktop. </br>
- Added footer caption on all 3 pages: "This is Maria's Coursework for COMP1004". <i>index.html line 34, vehiclesearch.html line 33, addvehicle.html line 43</i>
<h3>CSS</h3>
- I made the CSS responsive, when the page width is smaller than 500px. <i>style.css lines 71 - 85</i> </br>
- I decided to align the header elements for aesthetic purposes. <i>style.css lines 9, 13</i> </br>
- I made the main into a flexbox in order to make the results div fit better. Just using a precentage in relation to the main wasn't compatible with all the sizes of the window and some search results divs would even go out of it. <i>style.css lines 33, 34, 49</i>
<h3>JavaScript</h3>
- Wrote Playwright test that adds a new vehicle for a pre-existing owner. <i>coursework-sample.js lines 160-177</i> </br>
- Wrote Playwright test that sees "Error" message when not all the fields in the vehicle form are completed. <i>coursework-sample.js lines 179-190</i> </br>
- Wrote Playwright test that sees "Error" message when not all the fields in the owner form are completed. <i>coursework-sample.js lines 192-211</i> </br>
- Wrote Playwright test that checks owners with the same id return the message: "Error adding vehicle, please check console for details.". <i>coursework-sample.js lines 213-234</i> </br>
- Wrote Playwright test that checks vehicles with the same id return the message: "Error adding vehicle, please check console for details.". <i>coursework-sample.js lines 236-248</i> </br>
- I added two new messages. The first is used in People Search, Vehicle Search and when searching for the owner name. It reads: "Failed to fetch data, please check console for details." and it only appears if there was an error when selecting data from the database. The second is in the Add a Vehicle secotion and it reads: "Error adding vehicle, please check console for details.". This one only appears if there was an insert error. <i>scripts.js lines 94, 158, 180, 202</i> </br>
- I added many of console logs and errors to make it easier to undestand what is going on in the JS code. Most of these help with identifying errors communictaing with Supabase and checking the correct data has been taken from the form. <i>scripts.js lines 16, 93, 118, 131, 157, 179, 201, 217-218, 229, 239, 249, 262-266, 276, 290-295, 305</i>

