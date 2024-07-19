import Link from "next/link";

export default function Help() {
    return (
        <div>
        <div className="readme">
            <div className="readmeDiv">
                <h1 className="text-5xl mb-4">
                    How to add your Zig library to Zigistry?
                </h1>
                <div className="text-xl">
                    <ol>
                        <li>
                            On the main page of your GitHub repository, click on the
                            Cog wheel icon on the right of the screen
                        </li>
                        <li>
                            You&apos;ll see a section named topics, click on it.
                        </li>
                        <li>
                            Then in the text field type{" "}
                            <strong>zig-package</strong>, press enter (or return)
                            and click save changes.
                        </li>
                        <li>
                            And congrats! your library will be added to zigistry!
                            (zigistry will register your library in an hour).
                        </li>
                        <li>
                            <video
                                controls
                                className="rounded-2xl my-5 sm:w-2/5 w-4/5"
                                src="https://github.com/RohanVashisht1234/zigistry/assets/81112205/962b147c-16ce-44d8-a958-57c0f0e1447b"
                            >
                            </video>
                        </li>
                        <li>
                            Still facing issues or have suggestions? feel free to
                            open an issue{" "}
                            <Link
                                className="text-blue-400 underline"
                                href="https://github.com/RohanVashisht1234/zigistry/issues"
                            >
                                here
                            </Link>.
                        </li>
                    </ol>
                </div>
            </div>
            
        </div>
        <div className="w-full">
        <img src="zigister-finds-repos.svg"/>
    </div>
    </div>
    );
}
