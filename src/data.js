import {
  deepPurple,
  green,
  lime,
  orange,
  amber,
  indigo,
} from '@material-ui/core/colors';
import React from 'react';


export default {
  1: {
    primaryColor: '#bca070',
    link: '/rera/buyer-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'Buyer',
    nextMsg: [" Your Ownership Transfer request has been successfully submitted to ARRA."," The seller of the property has been notified of your request."],
    loginMsg:[],
    scenarioMsg:["Please provide the details of the property you wish to buy and the seller information."],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  2: {
    primaryColor: '#bca070',
    link: '/rera/seller-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'Seller',
    nextMsg: [" You approved the Ownership Transfer of the property."," Your approval has been sent to Ajman Real estate Regulatory Authority for its verification."],
    loginMsg:[],
    scenarioMsg:[" By approving this request, you as the owner of this property confirm  the Ownership Transfer of this property. "],
    actorID: '784198526973565',
    actorPassword: 'randomPassword',
  },
  3: {
    primaryColor: '#bca070',
    link: '/rera/admin-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'ARRA Admin',
    nextMsg: [" Ajman Real estate Regulatory Authority has successfully approved the request of the Ownership Transfer."," The approval has been sent to buyer and seller through SMS and emails."],
    loginMsg:[],
    scenarioMsg:[" By approving this request, you as a representative of ARRA verify and confirm the request of this Ownership Transfer."],
    actorID: '784197626973565',
    actorPassword: 'randomPassword',
  },
  4: {
    primaryColor: '#3B8AB3',
    link: '/mpd/buyer-verification-form',
    src: '/static/img/MPD.png',
    entity: 'MPD',
    actor: 'Buyer',
    nextMsg: [" Your No Objection Certificate (NOC) request has been successfully submitted to Ajman MPD."],
    loginMsg:[],
    scenarioMsg:["Buyer to upload the Ownership Transfer document."],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  5: {
    primaryColor: '#3B8AB3',
    link: '/mpd/admin-form',
    src: '/static/img/MPD.png',
    entity: 'MPD',
    actor: 'Ajman MPD Admin',
    nextMsg: [" Ajman MPD has successfully verified the Ownership Transfer document."," Ajman MPD - NOC has been issued and sent to buyer through SMS and email."],
    loginMsg:[],
    scenarioMsg: [" By approving this, you as a representative of Ajman MPD  verify the Ownership Transfer document  and  issue an Ajman MPD NOC."," Please ensure all necessary checks and internal procedures have been done before this approval."],
    actorID: '784197311267456',
    actorPassword: 'randomPassword',
  },
  6: {
    primaryColor: '#213076',
    link: '/fewa/buyer-noc-form',
    src: '/static/img/FEWA.png',
    entity: 'FEWA',
    actor: 'Buyer',
    nextMsg: [" Your NOC request has been successfully submitted to FEWA."],
    loginMsg:[],
    scenarioMsg: [" Buyer to upload the Ownership Transfer document and  Ajman MPD NOC."],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  7: {
    primaryColor: '#213076',
    link: '/fewa/admin-form',
    src: '/static/img/FEWA.png',
    entity: 'FEWA',
    actor: 'FEWA Admin',
    nextMsg: [" FEWA has successfully verified the Ownership Transfer document and Ajman MPD NOC."," FEWA - NOC has been issued and sent to buyer through SMS and email."],
    loginMsg:[],
    scenarioMsg: [" By approving this, you as a representative of the FEWA  verify the Ownership Transfer document and Ajman MPD NOC, and issue a FEWA NOC."," Please ensure all necessary checks and internal procedures have been done before this approval."],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  8: {
    primaryColor: '#b08a27',
    link: '/moj/seller-noc-form',
    src: '/static/img/MOJ.png',
    entity: 'MOJ',
    actor: 'Seller',
    nextMsg: [" Your NOC request has been successfully submitted to MOJ."],
    loginMsg:[],
    scenarioMsg: [" Seller to upload the Ownership Transfer document and  the original Title Deed."],
    actorID: '784198526973565',
    actorPassword: 'randomPassword',
  },
  9: {
    primaryColor: '#b08a27',
    link: '/moj/admin-form',
    src: '/static/img/MOJ.png',
    entity: 'MOJ',
    actor: 'MOJ Admin',
    nextMsg: [" MOJ has successfully verified the Ownership Transfer document and the Title Deed."," MOJ - NOC has been issued and sent to seller and buyer through SMS and email."],
    loginMsg:[],
    scenarioMsg: [" By approving this, you as a representative of the MOJ verify the Ownership Transfer document and the Title Deed, and issue an MOJ NOC."," Please ensure all necessary checks and internal procedures have been done before this approval."],
    actorID: '784197499786531',
    actorPassword: 'randomPassword',
  },
  10: {
    primaryColor: '#bd2138',
    link: '/abd/buyer-request-form',
    src: '/static/img/ABD.png',
    entity: 'ABD',
    actor: 'Buyer',
    nextMsg: [" Your Mortgage request has been successfully submitted to Ajman Bank."],
    loginMsg:[],
    scenarioMsg: [" Buyer to upload the Ownership Transfer document, Ajman MPD NOC, FEWA NOC and MOJ NOC."],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  11: {
    primaryColor: '#bd2138',
    link: '/abd/admin-form',
    src: '/static/img/ABD.png',
    entity: 'ABD',
    actor: 'Ajman Bank Admin',
    nextMsg: [" Ajman Bank has successfully verified the Ownership Transfer document, Ajman MPD NOC, FEWA NOC and MOJ NOC."," The Mortgage Approval has been issued and sent to buyer."],
    loginMsg:[],
    scenarioMsg: [" By approving this, you as a representative of Ajman Bank verify the Ownership Transfer document, Ajman MPD NOC, FEWA NOC and MOJ NOC, and issue a Mortgage Approval.", " Please ensure all necessary checks and internal procedures have been done before this approval."],
    actorID: '784199346903902',
    actorPassword: 'randomPassword',
  },
  12: {
    primaryColor: '#f8f9fa',
    link: '/enbd/admin-form',
    src: '/static/img/CentralBank.png',
    entity: 'CentralBank',
    actor: 'Central Bank Admin',
    nextMsg: [" You as a representative of the Central bank have successfully performed the requisite KYC/ AML procedures and approve of this property transfer."],
    loginMsg:[],
    scenarioMsg: [" By Approving this document, you as a representative of the Central Bank verify that you have performed the requisite KYC/ AML procedures and approve of this property transfer."],
    actorID: '784199236734452',
    actorPassword: 'randomPassword',
  },
  13: {
    primaryColor: '#bca070',
    link: '/rera/buyer-td-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'Buyer',
    nextMsg: [" Your request for issuance of a new Title Deed has been successfully submitted to ARRA."],
    loginMsg:[],
    scenarioMsg: [" Buyer to upload the Ownership Transfer document, Ajman MPD NOC, FEWA NOC, MOJ NOC, the original Title Deed and Bank Mortgage Approval document."],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  14: {
    primaryColor: '#bca070',
    link: '/rera/admin-td-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'ARRA Admin',
    nextMsg: [" ARRA has successfully approved the issuance of the new Title Deed.", "The Title Deed has been issued and sent to the buyer."],
    loginMsg:[],
    scenarioMsg: [" By approving this request, you as the representative of ARRA have ensured to have verified all the submitted documents and will issue a Title Deed in the name of the new owner."],
    actorID: '784197626973565',
    actorPassword: 'randomPassword',
  }
};