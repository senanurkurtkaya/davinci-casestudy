
export function Home() {
    return (
        <div>
            <h1 className="text-2xl font-medium text-center">Home Page</h1>
            <p className="text-lg text-center mt-4">A minimal React app that lists Users and Posts, supports basic CRUD UX, and shows their relationship via userId.</p>
            <div className="w-md flex items-center justify-between mx-auto my-6">
                <img src="nestjs.svg"/>
                <img src="vite.svg"/>
                <img src="react.png"/>
            </div>
        </div>
    );
}
