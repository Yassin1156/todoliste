export function LoginPage() {
  return (
    <>
      <title>Login page</title>

      <h1>Login page</h1>
      
      <div className="email">
        <p>
           email: <input type="email" placeholder="Bitte Email eingeben" id="email" />
        </p>
      </div>
      
      <div className="password">
        <p>
          password: <input type="password" placeholder="Bitte password eingeben" id="password" />
        </p>
      </div>
      
      <button >Speichern</button>
    </>
  );
}