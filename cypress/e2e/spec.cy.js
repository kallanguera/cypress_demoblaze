import { faker } from '@faker-js/faker';

describe('DemoBlaze validations', () => {
  beforeEach(()=>{
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.clearAllSessionStorage()
    cy.visit('https://www.demoblaze.com/')
  })

  const userName = faker.person.firstName() + faker.person.lastName()
  const userPass = '123456789'

  describe('Validate Sign up',()=>{
    it('Validate Sign Up with valid user', () => {          
      cy.signUp(userName, userPass)    
    })
  
    it('Validate Sign Up with user already created', ()=>{
      const stub = cy.stub()
      cy.on('window:alert', stub)
  
      cy.fillSignIn(userName, userPass);        
      cy.get('button').contains('Sign up').click({force: true}).should(()=>{
        expect(stub.getCall(1)).to.be.calledWith(`This user already exist.`)      
      })  
    })
  })

  describe('Validate login', ()=>{
    it('Validate Login/Logout', ()=>{          
      cy.login(userName, userPass)
      cy.get('#nameofuser').should('include.text',userName)
      cy.get('#login2').should('not.be.visible')

      cy.get('#logout2').click();      
      cy.get('#logout2').should('not.be.visible')
    })

    it('Validate login with invalid user',()=>{
      const stub = cy.stub()
      cy.on('window:alert', stub)

      cy.login("FalseUserBLABLA", userPass).should(()=>{
        expect(stub.getCall(0)).to.be.calledWith('User does not exist.')
      })
    })
  })

  describe('Validate cart',()=>{
    let userName = ''
    const userPass = '123456789'

    beforeEach(()=>{ 
      userName = faker.person.firstName() + faker.person.lastName()
      cy.signUp(userName, userPass)
      cy.clearCookies()     
      cy.clearLocalStorage()
      cy.clearAllSessionStorage()
      cy.visit('https://www.demoblaze.com/')
      cy.login(userName, userPass)
    })
  
    it('Validate cart and place an order',()=>{  
      //Navigate to Phones and Add Product to Cart
      cy.navigateToPhones()
      cy.locatePhoneAndAddToCart('Iphone')
      
      cy.navigateToPhones()
      cy.locatePhoneAndAddToCart('Samsung')
  
      //Navigate to Cart
      cy.get('#cartur').click()
      cy.get('a').contains('Delete').click()    
            
      cy.get('button').contains('Place Order').click({force:true})

      cy.get('#name').type(userName,{force:true});
      cy.get('#country').type(faker.location.country(),{force:true})
      cy.get('#city').type(faker.location.city(),{force:true})
      cy.get('#card').type(faker.finance.creditCardNumber(),{force:true})
      cy.get('#month').type(12,{force:true})
      cy.get('#year').type(2026,{force:true})    
    })
  
    it('Validate charge info', ()=>{
      //Navigate to Phones and Add Product to Cart
      cy.navigateToPhones()
      cy.locatePhoneAndAddToCart('Iphone')
      
      cy.navigateToPhones()
      cy.locatePhoneAndAddToCart('Samsung')
  
      //Navigate to Cart
      cy.get('#cartur').click()
      cy.get('a').contains('Delete').click()    
      
      let orderInfo = {
        name: userName,
        country: faker.location.country(),
        city: faker.location.city(),
        card: faker.finance.creditCardNumber(),
        month: 12,
        year: 2026
      }
      cy.wait(2000)
      
      cy.get('button').contains('Place Order').click({force: true})

      cy.get('#name').type(orderInfo.name);
      cy.get('#country').type(orderInfo.country)
      cy.get('#city').type(orderInfo.city)
      cy.get('#card').type(orderInfo.card)
      cy.get('#month').type(orderInfo.month)
      cy.get('#year').type(orderInfo.year)

      cy.get('button').contains('Purchase').click()

      //I'm getting issues with the Order modal
      cy.get('.lead').contains(orderInfo.name)
      cy.get('.lead').contains(orderInfo.country)
      cy.get('.lead').contains(orderInfo.city)
      cy.get('.lead').contains(orderInfo.year)
      cy.get('.lead').contains(orderInfo.year)
    })
  })
})

