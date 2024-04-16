import { test, expect } from '@playwright/test';

test.describe.parallel("Search Api test",() =>{

    const baseUrl= "http://localhost:7000/api";

    test("Search Api test - Assert Response Status",async({request})=>{
      const response = await request.get(`${baseUrl}/search`)
      expect(response.status()).toBe(200);
     
    })

    test("Search Api test - Assert Response Status Array",async({request})=>{

        const response = await request.get(`${baseUrl}/hotels/search`);
        const responseBody = JSON.parse(await response.text());
        expect(Array.isArray(responseBody.data)).toBe(true);
      })
        
      test("Each Page has 5 Hotels",async({request})=>{
           const response = await request.get(`${baseUrl}/hotels/search`);
           const responseBody = JSON.parse(await response.text());
           expect(responseBody.data.length).toBe(5);
    
        })

        test("Get Only Budget Hotel type",async({request}) =>{
            const response = await request.get(`${baseUrl}/hotels/search?types=Budget`)
            const responseBody = JSON.parse(await response.text());
            expect(responseBody.data.every(item=>item.type =="Budget")).toBe(true);
            expect(responseBody.data.some(item=>item.type =="Family")).toBe(false);
            console.log("Dilek 5 - Test");
        })

       test("get only hotels that have 5 or 4 star",async({request}) =>{
         const response = await request.get(`${baseUrl}/hotels/search?stars=5&stars=4`);
         const responseBody = JSON.parse(await response.text());

         expect(responseBody.data.every(item=>item.starRating==4 ||item.starRating==5 )).toBe(true);
         const sonuc = responseBody.data.some(item=>item.starRating < 4 ? true:false);
         expect(responseBody.data.some(item=>item.starRating < 4 ? true:false)).toBe(false);
       
       })

       test("Assert sort by price",async({request}) =>{
        const response = await request.get(`${baseUrl}/hotels/search?sortOption=pricePerNightAsc`);
        const responseBody = JSON.parse(await response.text());
        
        const AllHotelResponse = await request.get(`${baseUrl}/hotels`);
        const AllHotelResponseBody = JSON.parse(await AllHotelResponse.text());

        
        const minPriceItem = AllHotelResponseBody.reduce((minItem, currentItem) => {
            return currentItem.price < minItem.price ? currentItem : minItem;
        }, AllHotelResponseBody[0]);
        
       expect(responseBody.data[0].price == minPriceItem.price).toBe(true);

       })

       test("Assert Correct Page number",async({request}) =>{
          const response = await request.get(`${baseUrl}/hotels/search`);
          const responseBody = JSON.parse(await response.text());
          
          const AllHotelResponse = await request.get(`${baseUrl}/hotels`);
          const AllHotelResponseBody = JSON.parse(await AllHotelResponse.text());

          console.log(AllHotelResponseBody.length);
          console.log(responseBody.pagination.pages);

          const pageSize = 5;
          var expectedPages = Math.ceil(AllHotelResponseBody.length / pageSize)
          expect(expectedPages == responseBody.pagination.pages).toBe(true);

       })

}) 