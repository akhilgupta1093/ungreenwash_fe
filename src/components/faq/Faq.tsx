import React from 'react';
import MuiMarkdown from 'mui-markdown';

export function Faq() {
    return (
        <div>
            <div className="section" style={{width: '70vw', textAlign: 'justify'}}>
            <div style={{margin: '20px'}}>
                <MuiMarkdown>
                    {`
#### Company ESG and Sustainability Research Tool

This is a beta tool we built to illustrate how the capabilities of large language models (like the one powering chatGPT) can be used to **level up your ESG workflows**. This tool allows you to quickly surface excerpts in high-signal sources that are related to your query/question.

You can see what companies are reporting and, perhaps more importantly, **not reporting**. Look at what they are measuring, and **not measuring**. Use it to inspire your ESG engagement strategy!

Right now, there are two types of high-signal sources in our back end: Company 10-Ks (audited and legally accountable disclosures to the SEC, a U.S. regulatory agency), and their (voluntary) ESG (sustainability) reports.

While 10-Ks are legally required disclosure documents that are audited and legally accountable, ESG reports and the frameworks they use are **voluntary**, and targeted to investors and the public. ESG reports serve the purpose of informing investors and the public.

Note the difference in language across the two sources.  What insights can you surface?

`}
                </MuiMarkdown>
            </div>
            <div style={{margin: '20px'}}>
                <MuiMarkdown>
                    {`
##### Quick Start:

1. (1) Select the companies you want to research
2. (2) Ask a question, such as "What is this company doing about its plastic packaging?"
3. (3) Examine the answers (ordered by relevance)
`}
                </MuiMarkdown>
            </div>
            <div style={{margin: '20px'}}>
                <MuiMarkdown>
                    {`
##### Feedback:

* Did you surface any cool ESG/sustainability insights while using this tool? If so, let us know! [Email us](mailto:akhil@photic.ai)

* Like what you see? Let us know! [Email us](mailto:akhil@photic.ai)

* Don't like what you see? Want to see more and different features? Better data sources? Let us know! [Email us](mailto:akhil@photic.ai)

* Are you an ESG or sustainability professional and want us to build a completely different tool? Let us know! [Email us](mailto:akhil@photic.ai)

Please feel free to introduce yourself in your email.

`}
                </MuiMarkdown>
            </div>    
        </div>
        </div>
    )
}