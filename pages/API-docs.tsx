export default function apiDocs() {
    return (
        <div className="readme">
            <div className="readmeDiv">
                <h1>Zigistry&apos;s API</h1>

                You can now start using Zigistry&apos;s api as follows:

                <h3>For Packages:</h3>

                <strong>Get details for indivisual packages</strong>
                <br></br>

                <a href="https://zigistry.dev/api/packages/travisstaloch/simdjzon">https://zigistry.dev/api/packages/travisstaloch/simdjzon</a>
                <br></br>

                <strong>Get Search results:</strong>
                <br></br>

                <a href="https://zigistry.dev/api/search?q=Zap">https://zigistry.dev/api/search?q=Zap</a>
                <br></br>


                <strong>Get Filtered results:</strong>
                <br></br>

                <a href="https://zigistry.dev/api/search?q=Zap&filter=http">https://zigistry.dev/api/search?q=Zap&filter=http</a>
                <br></br>

                <strong>Get all results from a single topic:</strong>
                <br></br>

                <a href="https://zigistry.dev/api/search?filter=http">https://zigistry.dev/api/search?filter=http</a>
                <br></br>

                <h3>For Programs:</h3>

                <strong>Get details for indivisual programs</strong>
                <br></br>

                <a href="https://zigistry.dev/api/programs/travisstaloch/roc-cli-platform-zig">https://zigistry.dev/api/programs/travisstaloch/roc-cli-platform-zig</a>
                <br></br>

                <strong>Get Search results:</strong>
                <br></br>

                <a href="https://zigistry.dev/api/searchPrograms?q=Zap">https://zigistry.dev/api/searchPrograms?q=Zap</a>
                <br></br>

                <strong>Get Filtered results:</strong>
                <br></br>

                <a href="https://zigistry.dev/api/searchPrograms?q=Zap&filter=http">https://zigistry.dev/api/searchPrograms?q=Zap&filter=http</a>
                <br></br>


                <strong>Get all results from a single topic:</strong>
                <br></br>

                <a href="https://zigistry.dev/api/searchPrograms?filter=http">https://zigistry.dev/api/searchPrograms?filter=http</a>
                <br></br>


                <h3>For Special Index details (Packages):</h3>

                <strong>Get most used packages (Ascending order):</strong>
                <br></br>

                <a href="http://zigistry.dev/api/indexDetails?section=mostUsed&range=0..100">http://zigistry.dev/api/indexDetails?section=mostUsed&range=0..100</a>
                <br></br>

                <strong>Get latest used packages (Ascending order):</strong>
                <br></br>

                <a href="http://zigistry.dev/api/indexDetails?section=latestRepos&range=0..100">http://zigistry.dev/api/indexDetails?section=latestRepos&range=0..100</a>
                <br></br>

                <h3>For Special Index details (Programs):</h3>

                <strong>Get most used programs (Ascending order):</strong>
                <br></br>

                <a href="http://zigistry.dev/api/indexDetailsPrograms?section=mostUsed&range=0..100">http://zigistry.dev/api/indexDetailsPrograms?section=mostUsed&range=0..100</a>
                <br></br>

                <strong>Get latest used programs (Ascending order):</strong>
                <br></br>

                <a href="http://zigistry.dev/api/indexDetailsPrograms?section=latestRepos&range=0..100">http://zigistry.dev/api/indexDetailsPrograms?section=latestRepos&range=0..100</a>
                <br></br>

                Obviously, a lot of things need to be added to the api and I am currently working on it. But for now, this can be used for fetching basic stuff.

            </div>
        </div>
    )
}