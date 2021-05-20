# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)</br>
1.Within a Github action that runs whenever code is pushed. Muanually run the test will lead to a lot of unnecessary work, sometimts we may even forget to test. <br/>
Run the tests after all development is completed will be too late, we should be testing whenever a unit feature is pushed in order to make sure every unit is working properly.</br>
In that case, we choose 1.Within a Github action that runs whenever code is pushed.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No. I would not use the unit test to test the "message" feature because the "message" features is a big feature and needs the interactions of different individual components. It is the feature on application/feature level.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes. I would use the unit test to test the "max message length" feature, because it is a small and individual feature. We just need to write a unit test and send a message that contains more than 80 characters to the server and see what the server returns. It is fast and won't affect others unit tests.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?</br>
The tests will be run without using a browser UI.
   

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

