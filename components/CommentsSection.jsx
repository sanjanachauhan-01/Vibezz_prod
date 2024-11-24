// import React, { useEffect, useRef, useState} from 'react';
// import { View, Text, Modal, TouchableOpacity, FlatList, Image, StyleSheet, RefreshControl, TextInput } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import EvilIcons from '@expo/vector-icons/EvilIcons';
// import { addComment, AddCommentReplys, fetchCommentReplys, fetchComments } from '../lib/appwrite';
// import EmptyState from './EmptyState';
// import useAppwrite from '../lib/useAppwrite';
// import { ScrollView } from 'react-native-gesture-handler';

// const CommentsSection = ({ postID, userID, avatar, username, comments, refetch }) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isReplying, setIsReplying] = useState(false);
//   const [modalMarginTop, setModalMarginTop] = useState('130%');
//   const [commentID, setCommentID] = useState('');
//   const [textInputValue, setTextInputValue] = useState('');
//   const textInputRef = useRef(null);
//   const[replies, setReplies] = useState(false);
//   const[replytoComment, setReplyToComment] = useState(false);
//   const[commentReplyID , setCommentReplyID] = useState('');
//   const { data: commentRepliesArray } = useAppwrite(fetchCommentReplys,commentReplyID);
//   const [reloading, setReloading] = useState(false);
//  const[viewReply, setViewReply] = useState(false);

//  //to check if there is any replies 
//  const checkRepliesForComments = async (comments) => {
//   for (const comment of comments) {
//     try {
//       const response = await fetchCommentReplys(comment.$id); // Replace fetchReply with your actual function to fetch replies
//       if (response && response.length > 0) {
//         setViewReply(true); // Update your state management logic accordingly
//       }
//     } catch (error) {
//       console.error(`Error fetching replies for comment ID ${comment.$id}:`, error);
//     }
//   }
// };


// useEffect(() => {
//   if (comments && comments.length > 0) {
//     checkRepliesForComments(comments);
//   }
// }, [comments]);


// //to show if there is a section called reply.
// const showTheReplySection = (replySection,commentReplyID) => {
//   setReplies((replies) => !replies);
//   setReplyToComment(true);
//   setCommentReplyID(commentReplyID);
// };

// const handleCommentReplies = (commentReplyID) => {
//   setReplyToComment(true);
//   setCommentReplyID(commentReplyID);
// };


//   const handleTextInputFocus = () => {
//     setModalMarginTop('40%');
//   };

//   const handleInputChange = (text) => {
//     setTextInputValue(text);
//   };

//   const handleClose = () => {
//     setModalVisible(false);
//     setTextInputValue('');
//     setIsReplying(false);
//     setReplies(false)
//   };

//   const handleAddComment = () => {
//     const addFunction = isReplying ? AddCommentReplys : addComment;
//     const commentAdded = addFunction(commentID, postID, username, userID, textInputValue);
//     if (commentAdded) {
//       setTextInputValue('');
//       setModalVisible(false);
//       setIsReplying(false);
//       setReloading(true);
//     } else {
//       alert("Comment was not added, please try again later"); 
//     }
//   };

//   const handleComments = () => {
//     setModalVisible(true);
//     fetchComments(postID);
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//   };

//   const toggleLike = (comment) => {
//     comment.liked = !comment.liked;
//   };

//   const handleReply = (commentID) => {
//     setCommentID(commentID);
//     setIsReplying(true);
//     setTimeout(() => textInputRef.current?.focus(), 100);
//   };



//   return (
//     <TouchableOpacity  style={{ width: '100%'}} onPress={handleComments}>
//       <TouchableOpacity 
//         style={styles.button} 
//         activeOpacity={0.7}
//         onPress={handleComments}
//       >
//         <Text style={styles.buttonText}>View all comments</Text>
//         <AntDesign name="right" size={14} color="white" />
//       </TouchableOpacity>

//       <Modal
//         transparent
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={handleClose}
//       >
     
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={{ position:'static', paddingTop:10 , height:40}}>
//               <Text style={{ color: 'white' , fontWeight:'bold', textAlign:'left'}}>Comments</Text>
//             </View>

//           <FlatList
//               data={comments}
//               keyExtractor={(item) => item.$id}
//               renderItem={({ item }) => (
//                 <View style={{ flexDirection: 'column', marginTop:15, width:'100%' }}>
//                   {/*headerComments */}
//                      <ActualComments1
//                     comment={item.comment}
//                     id={item.$id}
//                     username={item.username}
//                     avatar={avatar}
//                     toggleLike={toggleLike}
//                     handleReply={handleReply}
//                     refreshing={refreshing}
//                     onRefresh={onRefresh}
//                     showTheReplySection={showTheReplySection}
//                     replies={replies}
//                     replySection={false}
//                     replytoComment
//                     viewReply={viewReply}
//                     // commentRepliesArray={comments}
//                   />
// {/* reply comments */}
//         {replies && (
//             <View style={{ marginLeft:10, marginVertical:5}}>
//               <ActualComments
//               avatar={avatar}
//               toggleLike={toggleLike}
//               handleReply={handleReply}
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               showTheReplySection={handleCommentReplies}
//               replies={replies}
//               replySection={true}
//               replytoComment
//               commentRepliesArray={commentRepliesArray}/>
//             </View>


//    )}
//                 </View>
//               )}
//               ListEmptyComponent={() => (
//                 <EmptyState
//                   title="No Comments Found"
//                   show={false}
//                 />
//               )}
//               refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//               }
//             />
       
//           </View>
          
//             <View style={{ marginBottom:'5%'}}>
//               <View style={{ backgroundColor:'transparent' , width:'100%' , marginTop:10 , shadowOpacity:10, alignContent:'flex-start' }}> 
//               <TextInput
//                 ref={textInputRef}
//                 style={{ color: 'white', paddingLeft:20 , alignSelf:'left'}}
//                 placeholder={isReplying ? "Reply to this comment" : "Add your comment"}
//                 onFocus={handleTextInputFocus}
//                 value={textInputValue}
//                 onChangeText={handleInputChange} 
//                 placeholderTextColor="gray"
//                 multiline
//               />
//               </View>
           
//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' , marginBottom:'5%'}}>
//               {textInputValue && (
//                 <TouchableOpacity onPress={handleAddComment} style={styles.closeButton}>
//                   <Text style={styles.closeButtonText}>Submit</Text>
//                 </TouchableOpacity>
//               )}
//               <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//             </View>
//           </View>
//         {/* </View> */}
//       </Modal>
//     </TouchableOpacity >
//   );
// };




// const ActualComments = ({avatar, toggleLike, handleReply, refreshing, onRefresh, showTheReplySection, replies,replySection,replytoComment, commentRepliesArray }) => { 
//   return(
//   <FlatList
//     // data={ replytoComment ? commentRepliesArray :comments}
//     data={commentRepliesArray}
//     keyExtractor={(item) => item.$id}
//     renderItem={({ item }) => (
//       <View style={styles.commentContainer}>
//         <View className="w-[30px] h-[30px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
//           <Image
//             source={{ uri: avatar }}
//             className="w-full h-full rounded-lg"
//             resizeMode="cover"
//           />
//         </View>

//         <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, paddingHorizontal: 10 }}> 
//         <Text style={[styles.commentText, { textAlign: 'left', fontWeight:'700',}]}>
//           {item.username}
//           </Text>
//           <Text style={[styles.commentText, {textAlign: 'left', paddingHorizontal:1, fontSize:12}]}>
//           {item.commentReply}
//           </Text>
//           {/* {showReply && ( */}
//           {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 0}} onPress={()=> showTheReplySection(item.$id)}>
//             <Text style={{ fontSize: 10, color: 'gray' }}>
//               { replies && !replySection ? "Hide Replies" : "View Replies"  } 
//             </Text>
//             <EvilIcons name="eye" size={18} color="gray" style={{ marginLeft: 4, paddingBottom: 3 }} />
//           </TouchableOpacity> */}
//            {/* )} */}
//         </View>
//         <View style={{ paddingHorizontal: 10 }}> 
//           <TouchableOpacity onPress={() => handleReply(item.$id)}>
//             <AntDesign name="enter" size={20} color="gray" />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity onPress={() => toggleLike(item)}>
//           <AntDesign
//             name={item.liked ? 'heart' : 'hearto'}
//             size={20}
//             color={item.liked ? 'red' : 'gray'}
//           />
//         </TouchableOpacity>
//       </View>
//     )}
//     // ListEmptyComponent={() => (
//     //   <EmptyState
//     //     title="No Comments Found"
//     //     show={false}
//     //   />
//     // )}
//     // refreshControl={
//     //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//     // }
//   />
// );
// }

// const ActualComments1 = ({ comment, username,avatar,id, toggleLike, handleReply, refreshing, onRefresh, showTheReplySection, replies,replySection,replytoComment, commentRepliesArray, viewReply}) => { 
//   return(
//     <>
//     <View style={styles.commentContainer}>
//         <View className="w-[30px] h-[30px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
//           <Image
//             source={{ uri: avatar }}
//             className="w-full h-full rounded-lg"
//             resizeMode="cover"
//           />
//         </View>

//         <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, paddingLeft:5}}> 
//         <Text style={[styles.commentText, { textAlign: 'left', fontWeight:'700',}]}>
//           {username}
//           </Text>
//           <Text style={[styles.commentText, {textAlign: 'left', paddingHorizontal:1, fontSize:12}]}>
//           {comment}
//           </Text>
//           {viewReply &&
//           <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 0}} onPress={()=> showTheReplySection(replySection,id)}>
//             <Text style={{ fontSize: 10, color: 'gray' }}>
//               { replies && !replySection ? "Hide Replies" : "View Replies"  } 
//             </Text>
//             <EvilIcons name="eye" size={18} color="gray" style={{ marginLeft: 4, paddingBottom: 3 }} />
//           </TouchableOpacity>
// }
//         </View>
//         <View style={{ paddingHorizontal: 10 }}> 
//           <TouchableOpacity onPress={() => handleReply(id)}>
//             <AntDesign name="enter" size={20} color="gray" />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity onPress={() => toggleLike(item)}>
//          {/* <AntDesign
//             name={item.liked ? 'heart' : 'hearto'}
//             size={20}
//             color={item.liked ? 'red' : 'gray'}
//           />  */}

//  <AntDesign
//             name={'hearto'}
//             size={20}
//             color={'red'}
//           />
//         </TouchableOpacity>
//       </View>
//     </>
//   )}

// const styles = StyleSheet.create({
//   button: {
//     width: '100%',
//     borderColor: 'white',
//     borderWidth: 0.5,
//     borderRadius: 10,
//     maxHeight: 35,
//     height: 35,
//     justifyContent: 'flex-start',
//     backgroundColor: 'gray',
//     shadowOpacity: 10,
//     flexDirection: 'row',
//     padding: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     paddingHorizontal: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     height: '70%',
//     backgroundColor: 'black',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//   },
//   commentContainer: {
//     flexDirection: 'row',
//     // marginBottom: 15,
//     maxHeight: 90,
//     height: 70,
//   },
//   commentText: {
//     color: 'white', 
//   },
//   closeButton: {
//     alignSelf: 'center',
//     padding: 10,
//   },
//   closeButtonText: {
//   borderWidth:1,
//   borderColor: 'white',
//   backgroundColor:'#818cf8',
//     width:60,
//     textAlign:'center',
//     color: 'white',
//     fontSize: 16,
//     borderRadius:10
//   },
// });

// export default CommentsSection;


import React, { useEffect, useRef, useState} from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Image, StyleSheet, RefreshControl, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { addComment, AddCommentReplys, fetchCommentReplys, fetchComments } from '../lib/appwrite';
import EmptyState from './EmptyState';
import useAppwrite from '../lib/useAppwrite';
import { ScrollView } from 'react-native-gesture-handler';
import Waveform from './Waveform';
import { Ionicons } from '@expo/vector-icons';
import FormField from './FormField';
import EmptyState2 from './EmptyState2';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CommentReaction from './CommentReactions';


const CommentsSection = ({ postID, userID, avatar, username }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMarginTop, setModalMarginTop] = useState('130%');
  const [ up, setUp] = useState(false);
  const[modalHieght, setModalHeight] = useState('60%');
  const[viewReply, setShowViewReply] = useState(false);

  const handleCommentSectionUp = () => {
    setUp((prevState) => {
        const newState = !prevState; // Calculate the new state
        setModalHeight(newState ? '100%' : '60%'); // Update the modalHeight based on newState
        return newState; // Update 'up' with newState
    });
};

    const handleClose = () => {
    setModalVisible(false);
  };

    const [textInputValue, setTextInputValue] = useState('');

    const handleInputChange = (text) => {
    setTextInputValue(text);
  };

    const handleTextInputFocus = () => {
    setModalMarginTop('40%');
  };

 

  const [refreshing, setRefreshing] = useState(false);
  //to show the view replies option, we need to check if there are any replies 
//if this is true, the same comment section will show, but to the left
const[commentReply , setCommentReply] = useState(false);
  const { data: comments, refetch } = useAppwrite(fetchComments,postID);



  const [isReplying, setIsReplying] = useState(false);
  const [commentID, setCommentID] = useState('');

  const textInputRef = useRef(null);

    const handleReply = (commentID) => {
    setCommentID(commentID);
    setIsReplying(true);
    setTimeout(() => textInputRef.current?.focus(), 100);
  };

  

  console.log(comments)


useEffect(() => {
    fetchComments(postID);
}, []);

  const handleAddComment = () => {
    // const addFunction = isReplying ? AddCommentReplys : addComment;
    // const commentAdded = addFunction(commentID, postID, username, userID, textInputValue);
    // if (commentAdded) {
      setTextInputValue('');
      setModalVisible(false);
      // setIsReplying(false);
      // setReloading(true);
    // } else {
    //   alert("Comment was not added, please try again later"); 
    // }
  };



  return (
    <> 
    <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.7}
            onPress={()=>setModalVisible(true)}
          >
            <Text style={styles.buttonText}>View all comments</Text>
            <AntDesign name="right" size={14} color="white" />
        </TouchableOpacity>

<Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleClose}
      >
     
        <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { height: `${modalHieght}`}]}>
            <View style={{ position:'static', flexDirection:'row', marginVertical:20, marginHorizontal:10}}>
              {/* <Text style={{ color: 'white' , fontWeight:'bold', textAlign:'left'}}>Comments</Text>
               */}
               <Text className="text-xl text-white font-pregular">Comments</Text>
<TouchableOpacity style={{ flex:1 , alignItems:'flex-end', justifyContent:'flex-end'}} onPress={handleCommentSectionUp}> 
               <AntDesign name= { up ? "downcircle" : "upcircle" } size={20} color="white" />
               {/* <AntDesign name="downcircle" size={24} color="black" /> */}
               </TouchableOpacity>
            </View>
            
  {/* commentSection */}

          <FlatList
              data={comments}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column', width:'100%', paddingHorizontal:10}}>
                  {/*headerComments */}
                     <ActualComments1
                    comment={item.comment}
                    id={item.$id}
                    username={item.username}
                    avatar={avatar}
                    // setViewReply={setViewReply}
                    // viewReplyButton={viewReplyButton}
                    commentReply ={commentReply}
                    setCommentReply={setCommentReply}
                    thisisreply={false}
                    commentReplies={item.commentReplies}
                    handleReply={handleReply}
                    setShowViewReply={setShowViewReply}
                    viewReply={viewReply}
                  />
                </View>
              )}
              ListEmptyComponent={() => (
                <EmptyState2
                  title="No Comments Found"
                />
              )}
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
            />
  {/* end of commentsSection */}

               <View style={{width:'100%' , marginTop:10 , shadowOpacity:10, alignContent:'flex-start' }}> 
               {/* <TextInput
                ref={textInputRef}
                style={{ color: 'white', paddingLeft:20 , alignSelf:'left'}}
                placeholder={isReplying ? "Reply to this comment" : "Add your comment"}
                onFocus={handleTextInputFocus}
                value={textInputValue}
                onChangeText={handleInputChange} 
                placeholderTextColor="gray"
                multiline
              /> */}

          <FormField
          title="Add Comment"
          // value={}
          placeholder="Type or Record"
          handleChangeText={(e) => handleAddComment}
          otherStyles="mt-10"
          record={true}
          onRecordingComplete={(uri)=> console.log(uri)}
        />
        </View>           
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' , marginBottom:'5%'}}>
              {textInputValue && (
                <TouchableOpacity onPress={handleAddComment} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Submit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>

</Modal>
</>
  )
}


const ActualComments1 = ({  
  // comment,
  id,
  username,
  avatar,
  commentReply,
  setCommentReply,
  thisisreply,
  commentReplies,
  handleReply,
}) => { 


let comment = "Sure! Here's a 250-word paragraph:indfulness has become an essential practice in today’s fast-paced world, where stress and anxiety often dominate our lives. It involves cultivating a state of awareness and acceptance of the present moment, free from judgment. By focusing on the here and now, mindfulness helps individuals develop a deeper connection with themselves and their surroundings. This practice is not limited to meditation alone; it can be incorporated into everyday activities such as eating, walking, or even working. Studies show that mindfulness improves mental clarity, reduces stress, and enhances emotional well-being. For example, a simple mindful breathing exercise can lower cortisol levels, the hormone responsible for stress, in just a few minutes. Beyond personal benefits, mindfulness also promotes better interpersonal relationships by fostering empathy and understanding. When practiced regularly, it rewires the brain to respond to challenges with calmness rather than reactivity. Despite its simplicity, mindfulness requires practice and consistency to fully harness its benefits. It is common for beginners to struggle with staying focused or being overly critical of wandering thoughts. However, with time, patience, and guided techniques, mindfulness can transform one’s approach to life. As society becomes increasingly digital and distracted, the value of being present has never been greater. Whether through apps, community classes, or personal reflection, mindfulness offers a way to reclaim peace and focus in the chaos. Embracing this practice can be a powerful step toward achieving a balanced, fulfilling life, where challenges are met with resilience and moments of joy are truly cherished."
const truncatedComment = comment.split(' ').slice(0, 50).join(' ');

const[isLiked, setIsLiked] = useState(false);
const [showReactions, setShowReactions] = useState(false); // State to toggle reaction component
const [reaction, setReaction] = useState(null);

const toggleReactions = () => {
  setShowReactions(!showReactions);
};

const handleSelectReaction = (selectedReaction) => {
  setReaction(selectedReaction); // Set the selected reaction
  setShowReactions(false); // Close the reaction panel after selection
};

const toggleLike = () =>{
setIsLiked((prevState) => !prevState);
}

 const[viewReply, setShowViewReply] = useState(false);
 const[ viewReplyButton, setViewReply] = useState(false);
 const [isTextExpanded, setIsTextExpanded] = useState(false); // For expanding text

console.log("replies to me", commentReplies)
  //this needs to be filled, when the viewReply button is clicked, passing the id.

  useEffect(() => {
    if(commentReplies && commentReplies.length > 0){
    setViewReply(true);
    setCommentReply(true);
    }else{
      setViewReply(false);
    }
   }
, []);

  return(
    <View style={{ width:'100%'}}>
    <View style={styles.commentContainer}>
        <View className="w-[30px] h-[30px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
          <Image
            source={{ uri: avatar }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1}}> 
          <View style={{ flexDirection:'row', width:'100%' ,height:30, paddingVertical:5, alignContent:'center', justifyContent:'center'}}>
         <Text className="text-white font-pregular"> 
          {username}
          </Text>
          <View style={{ paddingRight: 5, marginLeft:'35%' }}> 
          <TouchableOpacity onPress={() => handleReply(id)}>
            <AntDesign name="enter" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("bvhieho")} style={{ paddingHorizontal: 15 }}>
        <TouchableOpacity onPress={() => toggleLike()}>
 <AntDesign
            name={ isLiked ? 'hearto' : 'heart'}
            size={20}
            color={ isLiked ?'red' : 'deeppink'}
          />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleReactions}>
              <MaterialIcons name="add-reaction" size={20} color="yellow" />

              {/* {showReactions && (
                <View
                style={{
                  position: 'absolute',
                  top: 40, // Position below the username row
                  left: '50%',
                  transform: [{ translateX: -240 }], // Adjust based on width (250px / 2)
                  width: 250,
                  zIndex: 1,
                  backgroundColor: 'pink',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height:40,
                }}
                >
            <CommentReaction
              onSelectReaction={handleSelectReaction}
              onClose={() => setShowReactions(false)}
            />
             </View> */}

{showReactions && (
  <View
    style={{
      position: 'absolute',
      top: 0, // Cover the entire screen vertically
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {/* Backdrop */}
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        zIndex: 1,
      }}
      onPress={() => setShowReactions(false)} // Close when tapping outside
    />

    {/* Comment Reaction Container */}
    <View
      style={{
        position: 'absolute',
        top: 15, // Center vertically
        left: '50%', // Center horizontally
        transform: [{ translateX: -240 }, { translateY: -20 }], // Adjust for container dimensions (250px width, 40px height)
        width: 250,
        height: 30,
        zIndex: 2,
        backgroundColor: 'transparent', // Solid background
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CommentReaction
        onSelectReaction={handleSelectReaction}
        onClose={() => setShowReactions(false)}
      />
    </View>
  </View>

          )}

            </TouchableOpacity>
            {reaction && (
            <Text style={styles.selectedReactionText}>
              Reaction: {reaction.icon.charAt(0).toUpperCase() + reaction.icon.slice(1)}
            </Text>
          )}

          </View>


          {/* {reaction && (
            <Text style={styles.selectedReactionText}>
              Reaction: {reaction.icon.charAt(0).toUpperCase() + reaction.icon.slice(1)}
            </Text>
          )}

          {showReactions && (
            <CommentReaction
              onSelectReaction={handleSelectReaction}
              onClose={() => setShowReactions(false)}
            />
          )} */}
          <Text style={[styles.commentText, {textAlign: 'left', paddingHorizontal:1, fontSize:12, alignSelf:'stretch'}]}>  
  {isTextExpanded ? comment : truncatedComment}
  </Text>


{comment.split(' ').length > 100 && (
  <TouchableOpacity onPress={() => setIsTextExpanded(prevState => !prevState)}>
    <Text style={{ fontSize: 11, color: 'gray' }}>
      {isTextExpanded ? 'Read less...' : 'Read more...'}
    </Text>
  </TouchableOpacity>
)}

       
          {viewReplyButton &&
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 0}} onPress={() => setShowViewReply((prevState) => !prevState)}>
            <Text style={{ fontSize: 10, color: 'gray' }}>
              { viewReply  ? "Hide Replies" : "View Replies"  } 
              
        
            </Text>
            <EvilIcons name="eye" size={18} color="gray" style={{ marginLeft: 4, paddingBottom: 3 }} />
          </TouchableOpacity>
}
        </View>
        {/* <View style={{ paddingRight: 5, backgroundColor:'blue' }}> 
          <TouchableOpacity onPress={() => handleReply(id)}>
            <AntDesign name="enter" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("bvhieho")} style={{ paddingHorizontal: 15 }}>

 <AntDesign
            name={'hearto'}
            size={20}
            color={'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("bvhieho")}>
<MaterialIcons name="add-reaction" size={20} color="yellow" />
       </TouchableOpacity> */}
      </View>
      { viewReply && (
      <View style={{ width:'95%', left:'5%', marginVertical:10}}>
      <FlatList
              data={commentReplies}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column', width:'100%'}}>
                     <ActualComments1
                    comment={item.commentReply}
                    id={item.$id}
                    username={item.username}
                    avatar={avatar}
                    // setViewReply={setViewReply}
                    viewReplyButton={false}
                    // commentReply ={commentReply}
                    // setCommentReply={setCommentReply}
                    thisisreply={true}
                    handleReply={handleReply}
                  />
                </View>
              )}
              // ListEmptyComponent={() => (
              //   <EmptyState
              //     title="No Comments Found"
              //     show={false}
              //   />
              // )}
            />
       

</View>
      )}
    </View>
  )}





const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    maxHeight: 35,
    height: 35,
    justifyContent: 'flex-start',
    backgroundColor: 'gray',
    shadowOpacity: 10,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    // flex:1,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal:10,
  },
  commentContainer: {
    flexDirection: 'row',
    // marginBottom: 15,
    // maxHeight: 200,
    // backgroundColor:'cadetblue',
  },
  commentText: {
    color: 'white', 
    width:'100%',
    // backgroundColor:'cadetblue',
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
  },
  closeButtonText: {
  borderWidth:1,
  borderColor: 'white',
  backgroundColor:'#818cf8',
    width:60,
    textAlign:'center',
    color: 'white',
    fontSize: 16,
    borderRadius:10
  },
});



export default CommentsSection
