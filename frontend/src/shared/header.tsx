export function Header() {
    return <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl" href="/">Web Development Assignment</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a href="/">Home</a></li>
      <li><a href="/users">Users</a></li>
      <li><a href="/posts">Posts</a></li>
     </ul>
  </div>
</div>
}