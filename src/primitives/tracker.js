export function tracker(event_name, values) {
  console.log({ event_name, values });
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event: event_name,
      ...values
    });
  }
}
