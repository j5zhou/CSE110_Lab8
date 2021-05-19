/**
 * @jest-environment jsdom
 */
import {pushToHistory} from '../scripts/router.js'

 describe('Test function: pushToHistory', () => {

    describe("Test: state = settings", ()=>{

        test('length of the history stack', () => {
            let oldLength = history.length;
            let newHisotryObj = pushToHistory("settings",null);
            expect(newHisotryObj.length).toEqual(oldLength+1);
          });
        
          test('current state object', () => {
            let newHisotryObj = pushToHistory("settings",null);
            expect(newHisotryObj.state).toEqual({ page: 'settings' });
          });
    });

    describe("Test: state = entry", ()=>{

        describe("Entry number = 1", () =>{
            test('length of the history stack', () => {
                let oldLength = history.length;
                let newHisotryObj = pushToHistory("entry",1);
                expect(newHisotryObj.length).toEqual(oldLength+1);
              });
            
              test('current state object', () => {
                let newHisotryObj = pushToHistory("entry",1);
                expect(newHisotryObj.state).toEqual({ page: 'entry1' });
              });
        });
        describe("Entry number = 2", () =>{
            test('length of the history stack', () => {
                let oldLength = history.length;
                let newHisotryObj = pushToHistory("entry",2);
                expect(newHisotryObj.length).toEqual(oldLength+1);
              });
            
              test('current state object', () => {
                let newHisotryObj = pushToHistory("entry",2);
                expect(newHisotryObj.state).toEqual({ page: 'entry2' });
              });
        });
        describe("Entry number = 10", () =>{
            test('length of the history stack', () => {
                let oldLength = history.length;
                let newHisotryObj = pushToHistory("entry",10);
                expect(newHisotryObj.length).toEqual(oldLength+1);
              });
            
              test('current state object', () => {
                let newHisotryObj = pushToHistory("entry",10);
                expect(newHisotryObj.state).toEqual({ page: 'entry10' });
              });
        });
        
    });
    describe("Test: default", ()=>{
        test('length of the history stack', () => {
            let oldLength = history.length;
            let newHisotryObj = pushToHistory({},null);
            expect(newHisotryObj.length).toEqual(oldLength+1);
          });
        
          test('current state object', () => {
            let newHisotryObj = pushToHistory({},null);
            expect(newHisotryObj.state).toEqual({});
          });
    });

  });