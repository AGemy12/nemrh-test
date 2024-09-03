export default function ({ store, redirect, app, localePath }) {
  if (app.$cookies.get('nemrh_website_user_token')) {
    return redirect(localePath('/'))
  }
}
