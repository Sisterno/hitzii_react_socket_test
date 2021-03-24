export interface messageViewProps {
    
}
 
const messageView: React.SFC<messageViewProps> = () => {
    return (
        <div>
            <ul id="messages"></ul>
        </div>
    );
}
 
export default messageView;