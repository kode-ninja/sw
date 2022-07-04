import styled from "styled-components";

interface IVideoProps {
    title: string,
    thumbnail_url: string,
    duration: string
}

const StyledVideo = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: space-between;
`

const StyledThumbnail = styled.img`
border-radius: 0.25rem;
margin-right: 1rem;
`
const StyledVideoContent = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`
const StyledDuration = styled.span`
font-size: small;
align-self: flex-end;
margin-right: 0.5rem;
margin-bottom: 0.25rem;
`

const Video = ({title, thumbnail_url, duration}: IVideoProps) => {
    return (
        <StyledVideo>
            <StyledThumbnail src={thumbnail_url} alt={title}/>
            <StyledVideoContent>
                <h6>{title}</h6>
                <StyledDuration className="text-muted">
                    {duration}
                </StyledDuration>
            </StyledVideoContent>
        </StyledVideo>
    );
}

export default Video;