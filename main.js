const { createClient } = require("@supabase/supabase-js");

const URL = 'http://localhost:54321';
// needed for `updateUserById`
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.M2d2z4SFn5C7HlJlaSLfrzuYim9nbY_XI40uWFN3hEE';

const supabase = createClient(URL, SERVICE_KEY);

(async () => {
  const { user: signUpUser, error: signUpError } = await supabase.auth.signUp({
    email: "test@test.com",
    password: "password",
  });
  console.log('signUpUser', signUpUser);
  console.error('signUpError', signUpError);

  const {
    error: confirmEmailError,
    user: confirmEmailUser,
  } = await supabase.auth.api.updateUserById(signUpUser.id, {
    email_confirm: true,
  });
  console.log('confirmEmailUser', confirmEmailUser);
  console.error('confirmEmailError', confirmEmailError);

  const { user, error: signInError } = await supabase.auth.signIn({
    email: "test@test.com",
    password: "password",
  });
  console.error('signInError', signInError);
  console.log('signInUser', user);

  const session = supabase.auth.session();
  console.log('session', session);

  const { data: newSession, error: refreshSessionError } = await supabase.auth.refreshSession();

  console.error('refreshSessionError', refreshSessionError);
  console.log('newSession', newSession);
})();
