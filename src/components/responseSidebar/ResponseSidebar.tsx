import './ResponseSidebar.css'

interface ResponseSidebarVal {
    answer: string,
    score: number,
    filename: string,
    id: string,
}

interface ResponseSidebarProps {
    responses: ResponseSidebarVal[],
    setFileTab: React.Dispatch<React.SetStateAction<number>>,
    fileArray: string[],
    setScrollId: React.Dispatch<React.SetStateAction<string>>,
}

export function ResponseSidebar({ responses, setFileTab, fileArray, setScrollId }: ResponseSidebarProps) {
    // Create a sidebar on the left side of the page
    // For each response, display the answer and the score as a button
    console.log(responses);

    const handleClick = (response: ResponseSidebarVal) => {
        // Find the element of fileArray that matches the filename of the response
        // Set the file tab to the index of that element
        let index = fileArray.indexOf(response.filename);
        setFileTab(index);
        console.log("response filename = " + response.filename + "array = " + fileArray + " index = " + index);

        // Scroll to the response
        setScrollId(response.id);
    }
    
    return (
        <div className="response-sidebar">
            {responses && responses.map((response, index) => (
                <div className="response-sidebar-item">
                    <button className="response-sidebar-button" onClick={() => handleClick(response)}>
                        <div className="response-sidebar-answer">
                            {/* cut down answer to 10 words, add ... at the end */}
                            {response.answer.split(" ").slice(0, 10).join(" ") + "..."}
                        </div>
                        <div className="response-sidebar-score">
                            {response.score}
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}