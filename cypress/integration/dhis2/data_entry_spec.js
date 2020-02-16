/// <reference types="Cypress" />

describe('Test Aggregate Data entry', function() {
    this.beforeEach(()=>{
      cy.login()
      cy.on("window:before:load", win => {
        win.indexedDB.deleteDatabase("dhis2de");
        win.indexedDB.deleteDatabase("dhis2ou");
      });
      cy.visit('http://localhost:8080/dhis-web-dataentry/index.action')
      cy.server({delay:1000})
      // Set the XHR up as a route, do not mock the return (unless you want to)
      cy.route('post','/dhis-web-commons-ajax-json/getOrganisationUnitTree.action').as('getOU')
      cy.route('get','api/organisationUnits/**').as('getDS')
      cy.route('post','**/**/setorgnuit.action').as('setOU')
      cy.route('get','/dhis-web-commons/**').as('getResources')
      cy.route('post','/dhis-web-commons/**').as('postResources')
      cy.route('get','/dhis-web-dataentry/**').as('getDataEntryResources')
      cy.route('get','api/systemSettings/**').as('getSystemSettings')
      cy.route('get','api/optionSets/**').as('getOptionSets')
      cy.route('post','/api/dataValues').as('postDataValue')
      cy.wait(['@getOU','@postResources','@getDataEntryResources','@getSystemSettings'])
    })

    it('should save text data value successfully', function() {
      cy.get('#orgUnitImspTQPwCqd .toggle').click()
      cy.wait(['@getOU','@getDataEntryResources'])
      cy.get('#orgUnitO6uvpzGd5pu .toggle').click()
      cy.wait(['@getDataEntryResources'])
      cy.get('#orgUnitYuQRtpLP10I > .toggle > img').click()
      cy.wait(['@getDataEntryResources'])
      cy.get('#orgUnitDiszpKrYNg8 > a').click()
      cy.wait(['@getDataEntryResources'])
      cy.get('#selectedDataSetId').select('BfMAe6Itzgt')
      cy.get('#selectedPeriodId').select('202001')
      cy.wait(['@getDataEntryResources','@getOptionSets'])
      cy.get('#YtbsuPPo010-Prlt0C1RF0s-val').click().get('#YtbsuPPo010-Prlt0C1RF0s-val').type('{selectall}').type('{backspace}').type('{enter}')
      cy.wait('@postDataValue').then((xhr) => expect(xhr.status).to.equal(201))
      cy.get('#YtbsuPPo010-Prlt0C1RF0s-val').should('have.value', '')
      cy.get('#YtbsuPPo010-Prlt0C1RF0s-val').click().get('#YtbsuPPo010-Prlt0C1RF0s-val').type('{selectall}').type('{backspace}').type('1').type('{enter}')
      cy.wait('@postDataValue').then((xhr) => expect(xhr.status).to.equal(201))
      cy.get('#YtbsuPPo010-Prlt0C1RF0s-val').should('have.value', '1')
    })
  })