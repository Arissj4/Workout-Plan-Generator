
export default function SignIn( {provider}: {provider: string} ) { // This component is likely intended to be a client component if it's handling form submissions directly.
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </form>
    </div>
  )
}