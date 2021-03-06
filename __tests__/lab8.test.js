
describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    //page.setDefaultTimeout(10000);
    await page.goto('http://127.0.0.1:5500');
   // await page.waitForNavigation();
    await page.waitForTimeout(500);

});


  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });
  
  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);
  
  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    
    expect(page.url()).toMatch(/#entry1/);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const pageheading = await page.$eval("body > header > h1", el => el.textContent);
    expect(pageheading).toBe("Entry 1");


  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        const correctContents = { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
    
        const entry = await page.$('entry-page');
        const data = await (await entry.getProperty('entry')).jsonValue();
        expect(data.title).toEqual(correctContents.title);
        expect(data.date).toEqual(correctContents.date);
        expect(data.content).toEqual(correctContents.content);
        expect(data.image.src).toEqual(correctContents.image.src);
        expect(data.image.alt).toEqual(correctContents.image.alt);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const body = await page.evaluate(() => {
      const elem = document.querySelector('body');
      return elem.className;
    });
    expect(body).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img[alt="settings"]');
    expect(page.url()).toMatch(/#settings/);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const title = await page.evaluate(() => {
      const elem = document.querySelector('h1');
      return elem.innerText;
    });
    expect(title).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body = await page.evaluate(() => {
      const elem = document.querySelector('body');
      return elem.className;
    });
    expect(body).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toMatch(/#entry1/);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    // implement test11: Clicking the back button once should bring the user back to the home page
    await page.goBack()
    expect(page.url()).toEqual("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    // implement test12: When the user if on the homepage, the header title should be “Journal Entries”
    const title = await page.evaluate(() => {
      const elem = document.querySelector('h1');
      return elem.innerText;
    });
    expect(title).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('test13: On the home page the <body> element should not have any class attribute ', async () => {
    // implement test13: On the home page the <body> element should not have any class attribute 
    const body = await page.evaluate(() => {
      const elem = document.querySelector('body');
      return elem.className;
    });
    expect(body).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async () => {
    // implement test14: Verify the url is correct when clicking on the second entry

    await page.click('journal-entry:nth-child(2)');
    
    expect(page.url()).toMatch(/#entry2/);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async () => {
    // implement test15: Verify the title is current when clicking on the second entry
    const title = await page.evaluate(() => {
      const elem = document.querySelector('h1');
      return elem.innerText;
    });
    expect(title).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    /*
     implement test16: Verify the entry page contents is correct when clicking on the second entry
   */
       const correct_entries = await page.$('journal-entry:nth-child(2)');
       const correct_data = await (await correct_entries.getProperty('entry')).jsonValue();
    
        const entry = await page.$('entry-page');
        const data = await (await entry.getProperty('entry')).jsonValue();
        expect(data.title).toEqual(correct_data.title);
        expect(data.date).toEqual(correct_data.date);
        expect(data.content).toEqual(correct_data.content);
        expect(data.image.src).toEqual(correct_data.image.src);
        expect(data.image.alt).toEqual(correct_data.image.alt);
      }, 10000);

  // define and implement test17: On Entry page, Clicking the title should bring the user back to the home page
  it('test17:  On Entry page, Clicking the title should bring the user back to the home page', async() => {
    // implement test17:  On Entry page, Clicking the title should bring the user back to the home page
    await page.click("h1")
    expect(page.url()).toEqual("http://127.0.0.1:5500/");
  });

 // define and implement test18: Verify the url is correct when clicking on the fifth entry
 it('test18: Verify the url is correct when clicking on the fifth entry', async () => {
  // implement test18: Verify the url is correct when clicking on the fifth entry
  await page.click('journal-entry:nth-child(5)');
  expect(page.url()).toMatch(/#entry5/);
});
      
  // define and implement test19: Verify the title is current when clicking on the fifth entry
  it('test19: Verify the title is current when clicking on the fifth entry', async () => {
    // implement test19: Verify the title is current when clicking on the fifth entry
    const title = await page.evaluate(() => {
      const elem = document.querySelector('h1');
      return elem.innerText;
    });
    expect(title).toBe('Entry 5');
  });

   // define and implement test20: Verify the entry page contents is correct when clicking on the fifth entry
   it('test20: Verify the entry page contents is correct when clicking on the fifth entry', async () => {
    /*
     implement test20: Verify the entry page contents is correct when clicking on the fifth entry
   */
       const correct_entries = await page.$('journal-entry:nth-child(5)');
       const correct_data = await (await correct_entries.getProperty('entry')).jsonValue();
    
        const entry = await page.$('entry-page');
        const data = await (await entry.getProperty('entry')).jsonValue();
        expect(data.title).toEqual(correct_data.title);
        expect(data.date).toEqual(correct_data.date);
        expect(data.content).toEqual(correct_data.content);
        expect(data.image.src).toEqual(correct_data.image.src);
        expect(data.image.alt).toEqual(correct_data.image.alt);
      }, 10000);
  
  
});