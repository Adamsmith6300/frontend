export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA; // This is your GA Tracking ID

export const mutateItemsGA = (items, add_to_cart_qty = null) => {
  return items.map((item, ind) => {
    return {
      item_id: item["ProductId"],
      item_name: item["title"],
      item_brand: item["storename"],
      item_category: item["category"].toString(),
      item_variant: item["chosenVariant"] ? item["chosenVariant"]["id"] : null,
      price: item["chosenVariant"]
        ? item["chosenVariant"]["price"]
        : item["price"],
      quantity: add_to_cart_qty != null ? add_to_cart_qty : item["qty"],
    };
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const errorEvent = ({ category, label }) => {
  window.gtag("event", "error", {
    event_category: category,
    event_label: label,
  });
};

export const defaultEvent = ({ action, data }) => {
  window.gtag("event", action, data);
};

export const add_to_cart_event = (item, qty) => {
  let items = mutateItemsGA([item], qty);
  let totalValue = items[0].price * items[0].quantity;
  window.gtag("event", "add_to_cart", {
    currency: "CAD",
    value: totalValue,
    items: items,
  });
};
