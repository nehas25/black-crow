class BlackCrow {
  constructor(storage) {
    this.storage = storage || window.localStorage;
  }

  createAndGetVisitorId() {
    const visitorId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);  
    });
    this.storage.setItem(VISITOR_ID, visitorId);
    return visitorId;
  }

  getReferrerInfo(query) {
    const queryString = query || window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const referrerInfo = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_term: urlParams.get('utm_term'),
    }
    return referrerInfo;
  }

  getItemsOnPage(nodeList) {
    const items = [];
    const itemsNodeList = nodeList || document.querySelectorAll("[data-page-items]")[0];
    const itemsJson = JSON.parse(itemsNodeList.dataset['pageItems']);
    for(const itemJson of itemsJson) {
      const item = {
        id: itemJson.id,
        price: itemJson.price,
        name: itemJson.name,
      }
      items.push(item);
    }
    return items;
  }

  storeHistoryId(historyId) {
    if(!this.storage.getItem(HISTORY_ID)) {
      this.storage.setItem(HISTORY_ID, historyId);
    }
  }

  generateReqObj() {
    const pageId = document.body.dataset.page == 'home' ? 'home' : 'other';
    const pageTitle = document.title;
    const pageUrl = window.location.href;
    const pageReferrerUrl = document.referrer;
    const userAgent = navigator.userAgent;
    const ipAddr = '1.2.3.4';
    const visitorId = this.storage.getItem(VISITOR_ID) || this.createAndGetVisitorId();
    const isLoggedInUser = this.storage.getItem(TOKEN) ? true : false;
    const referrerInfo = this.getReferrerInfo();
    const referrerSource = referrerInfo.utm_source;
    const referrerChannel = referrerInfo.utm_medium;
    const referrerQuery = referrerInfo.utm_term;
    const historyId = this.storage.getItem(HISTORY_ID) || null;

    const eventAPIReqObj = {
      site_name: "BLACKCROW",
      page_id: pageId,
      site_country: 'CA',
      site_language: 'EN',
      site_currency: 'CAD',
      page_title: pageTitle,
      page_url: pageUrl,
      page_referrer_url: pageReferrerUrl,
      history_id: historyId,
      device_info: userAgent,
      visitor_ip_address: ipAddr,
      visitor_id: visitorId,
      member_id: '',
      is_logged_in_user: isLoggedInUser,
      user_has_subscription: false,
      referrer_source: referrerSource,
      referrer_channel: referrerChannel,
      referrer_query: referrerQuery,
    }

    if(document.body.dataset.page == 'items') {
      eventAPIReqObj.items = this.getItemsOnPage();
    }

    console.log('eventAPIReqObj' + JSON.stringify(eventAPIReqObj));

    return eventAPIReqObj;
  }

  async callPOSTEvents(req) {
    const postEventBody = req || this.generateReqObj();
    const postEventUrl = 'https://api.sandbox.blackcrow.ai/v1/events/view';
    try {
      const res = await fetch(`${postEventUrl}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postEventBody)
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const resJson = await res.json();
      this.storeHistoryId(resJson.history_id);
      return resJson;
    } catch(error) {
      console.error(error);
    }
  }

}