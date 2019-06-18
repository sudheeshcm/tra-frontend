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
    primaryColor: '#5c50ca',
    link: '/rera/buyer-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'Buyer',
    nextMsg: [
      ' Your Ownership Transfer request has been successfully submitted to RERA.',
      ' The seller of the property has been notified of your request.',
    ],
    loginMsg: [],
    scenarioMsg: [
      'Please provide the details of the property you wish to buy and the seller information.',
    ],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  2: {
    primaryColor: '#5c50ca',
    link: '/rera/seller-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'Seller',
    nextMsg: [
      ' You approved the Ownership Transfer of the property.',
      ' Your approval request has been sent to Real Estate Regulatory Authority for its verification.',
    ],
    loginMsg: [],
    scenarioMsg: [
      ' By approving this request, you as the owner of this property confirm  the Ownership Transfer of this property. ',
    ],
    actorID: '784198526973565',
    actorPassword: 'randomPassword',
  },
  3: {
    primaryColor: '#5c50ca',
    link: '/rera/admin-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'RERA Admin',
    nextMsg: [
      ' RERA has successfully approved the request of the Ownership Transfer.',
      ' The approval has been sent to buyer and seller through SMS and emails.',
    ],
    loginMsg: [],
    scenarioMsg: [
      ' By approving this request, you as a representative of RERA verify and confirm the request of this Ownership Transfer.',
    ],
    actorID: '784197626973565',
    actorPassword: 'randomPassword',
  },
  4: {
    primaryColor: '#5c50ca',
    link: '/mpd/buyer-verification-form',
    src: '/static/img/MPD.png',
    entity: 'MPD',
    actor: 'Buyer',
    nextMsg: [
      ' Your No Objection Certificate (NOC) request has been successfully submitted to MPD.',
    ],
    loginMsg: [],
    scenarioMsg: ['Buyer to upload the Ownership Transfer document.'],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  5: {
    primaryColor: '#5c50ca',
    link: '/mpd/admin-form',
    src: '/static/img/MPD.png',
    entity: 'MPD',
    actor: 'MPD Admin',
    nextMsg: [
      ' MPD has successfully verified the Ownership Transfer document.',
      ' MPD - NOC has been issued and sent to buyer through SMS and email.',
    ],
    loginMsg: [],
    scenarioMsg: [
      ' By approving this, you as a representative of MPD  verify the Ownership Transfer document  and  issue an MPD NOC.',
      ' Please ensure all necessary checks and internal procedures have been done before this approval.',
    ],
    actorID: '784197311267456',
    actorPassword: 'randomPassword',
  },
  6: {
    primaryColor: '#5c50ca',
    link: '/fewa/buyer-noc-form',
    src: '/static/img/FEWA.png',
    entity: 'FEWA',
    actor: 'Buyer',
    nextMsg: [' Your NOC request has been successfully submitted to EWA.'],
    loginMsg: [],
    scenarioMsg: [
      <p>
        Buyer to upload:
        <ul>
          <li> Ownership Transfer document</li>
          <li> MPD NOC </li>
        </ul>
      </p>,
    ],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
    verificationEndpoint: 'uae/verify',
  },
  7: {
    primaryColor: '#5c50ca',
    link: '/fewa/admin-form',
    src: '/static/img/FEWA.png',
    entity: 'FEWA',
    actor: 'EWA Admin',
    nextMsg: [
      ' EWA has successfully verified the submitted documents.',
      ' EWA - NOC has been issued and sent to buyer through SMS and email.',
    ],
    loginMsg: [],
    scenarioMsg: [
      <p>
        By approving this, you as a representative of the EWA verify:{' '}
        <ul>
          <li>Ownership Transfer document</li>
          <li>MPD NOC</li>
        </ul>{' '}
        and issue a EWA NOC.
      </p>,
      ' Please ensure all necessary checks and internal procedures have been done before this approval.',
    ],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
  },
  8: {
    primaryColor: '#5c50ca',
    link: '/moj/seller-noc-form',
    src: '/static/img/MOJ.png',
    entity: 'MOJ',
    actor: 'Seller',
    nextMsg: [' Your NOC request has been successfully submitted to MOJ.'],
    loginMsg: [],
    scenarioMsg: [
      <p>
        Seller to upload:
        <ul>
          <li>Ownership Transfer document</li>
          <li>Original Title Deed</li>
        </ul>
      </p>,
    ],
    actorID: '784198526973565',
    actorPassword: 'randomPassword',
    verificationEndpoint: 'uae/verify',
  },
  9: {
    primaryColor: '#5c50ca',
    link: '/moj/admin-form',
    src: '/static/img/MOJ.png',
    entity: 'MOJ',
    actor: 'MOJ Admin',
    nextMsg: [
      ' MOJ has successfully verified the submitted documents.',
      ' MOJ - NOC has been issued and sent to seller and buyer through SMS and email.',
    ],
    loginMsg: [],
    scenarioMsg: [
      <p>
        By approving this, you as a representative of the MOJ verify:{' '}
        <ul>
          {' '}
          <li> Ownership Transfer document </li> <li>Title Deed </li>{' '}
        </ul>
        and issue an MOJ NOC.
      </p>,
      ' Please ensure all necessary checks and internal procedures have been done before this approval.',
    ],
    actorID: '784197499786531',
    actorPassword: 'randomPassword',
  },
  10: {
    primaryColor: '#5c50ca',
    link: '/abd/buyer-request-form',
    src: '/static/img/ABD.png',
    entity: 'ABD',
    actor: 'Buyer',
    nextMsg: [
      ' Your Mortgage request has been successfully submitted to ABC Bank.',
    ],
    loginMsg: [],
    scenarioMsg: [
      <p>
        Buyer to upload the <b>Ownership Transfer document</b>, <b>MPD NOC</b>,{' '}
        <b>EWA NOC </b>and <b>MOJ NOC</b>.
      </p>,
    ],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
    verificationEndpoint: 'cb/verify',
  },
  11: {
    primaryColor: '#5c50ca',
    link: '/abd/admin-form',
    src: '/static/img/ABD.png',
    entity: 'ABD',
    actor: 'ABC Bank Admin',
    nextMsg: [
      ' ABC Bank has successfully verified the submitted documents.',
      ' The Mortgage Approval has been issued and sent to the buyer.',
    ],
    loginMsg: [],
    scenarioMsg: [
      <p>
        {' '}
        By approving this, you as a representative of ABC Bank verify the
        <b> Ownership Transfer document</b>, <b>MPD NOC</b>,{' '}
        <b>EWA NOC and MOJ NOC</b>, and issue a Mortgage Approval.{' '}
      </p>,
      ' Please ensure all necessary checks and internal procedures have been done before this approval.',
    ],
    actorID: '784199346903902',
    actorPassword: 'randomPassword',
  },
  12: {
    primaryColor: '#5c50ca',
    link: '/enbd/admin-form',
    src: '/static/img/centralBank.png',
    entity: 'CentralBank',
    actor: 'Central Bank Admin',
    nextMsg: [
      ' You as a representative of the Central bank have successfully performed the requisite KYC/ AML procedures and approve of this property transfer.',
    ],
    loginMsg: [],
    scenarioMsg: [
      ' By Approving this document, you as a representative of the Central Bank verify that you have performed the requisite KYC/ AML procedures and approve of this property transfer.',
    ],
    actorID: '784199236734452',
    actorPassword: 'randomPassword',
  },
  13: {
    primaryColor: '#5c50ca',
    link: '/rera/buyer-td-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'Buyer',
    nextMsg: [
      ' Your request for issuance of a new Title Deed has been successfully submitted to RERA.',
    ],
    loginMsg: [],
    scenarioMsg: [
      <p>
        {' '}
        Buyer to upload:{' '}
        <ul>
          {' '}
          <li>Ownership Transfer document</li> <li> MPD NOC </li>{' '}
          <li> EWA NOC </li> <li> MOJ NOC </li> <li> Original Title Deed </li>{' '}
          <li> Bank Mortgage Approval document </li>
        </ul>
      </p>,
    ],
    actorID: '784199346973961',
    actorPassword: 'randomPassword',
    verificationEndpoint: 'ajman/verify',
  },
  14: {
    primaryColor: '#5c50ca',
    link: '/rera/admin-td-form',
    src: '/static/img/ARRA.png',
    entity: 'ARRA',
    actor: 'RERA Admin',
    nextMsg: [
      ' RERA has successfully approved the issuance of the new Title Deed.',
      'The Title Deed has been issued and sent to the buyer.',
    ],
    loginMsg: [],
    scenarioMsg: [
      ' By approving this request, you as the representative of RERA have ensured to have verified all the submitted documents and will issue a Title Deed in the name of the new owner.',
    ],
    actorID: '784197626973565',
    actorPassword: 'randomPassword',
  },
};
