// Importing necessary dependencies
import React, { useContext, useState, useEffect } from 'react'; // Import React and hooks for state, lifecycle, and context management
import '../../styles/admin/manageHomePage.css'; // Import CSS for styling the component
import { HomePageContext } from '../../context/HomePageContext'; // Import HomePageContext for accessing homepage data

// Functional component for managing the homepage
function ManageHomePage() {
  const context = useContext(HomePageContext); // Access the HomePageContext
  const [editedComponents, setEditedComponents] = useState({}); // State for tracking edits to homepage components

  // Initialize editedComponents state with data from context when the component mounts
  useEffect(() => {
    if (context && context.homePageData) {
      setEditedComponents({
        openComp: { ...context.homePageData.openComp }, // Clone the openComp object
        stages: Array.isArray(context.homePageData.stages) ? [...context.homePageData.stages] : [], // Clone the stages array
        recommendations: Array.isArray(context.homePageData.recommendations) ? [...context.homePageData.recommendations] : [] // Clone the recommendations array
      });
    }
  }, [context]);

  // Display a loading message if context is not ready
  if (!context || !context.homePageData) {
    return <div>טוען...</div>;
  }

  const { homePageData, updateHomePageData } = context; // Destructure data and updater function from context

  // Handle changes to fields within a component
  const handleFieldChange = (componentName, field, value) => {
    setEditedComponents(prevState => ({
      ...prevState,
      [componentName]: Array.isArray(prevState[componentName]) 
        ? prevState[componentName].map((item, index) => 
            index === parseInt(field.split('.')[0]) 
              ? { ...item, [field.split('.')[1]]: value } 
              : item
          )
        : { ...prevState[componentName], [field]: value }
    }));
  };

  // Handle changes to specific features within the openComp component
  const handleFeatureChange = (index, value) => {
    setEditedComponents(prevState => ({
      ...prevState,
      openComp: {
        ...prevState.openComp,
        features: prevState.openComp.features.map((feature, i) => 
          i === index ? value : feature
        )
      }
    }));
  };

  // Add a new stage to the stages component
  const addStage = () => {
    setEditedComponents(prevState => ({
      ...prevState,
      stages: [...(prevState.stages || []), { title: '', description: '' }]
    }));
  };

  // Remove a stage from the stages component
  const removeStage = (index) => {
    setEditedComponents(prevState => ({
      ...prevState,
      stages: prevState.stages.filter((_, i) => i !== index)
    }));
  };

  // Add a new recommendation to the recommendations component
  const addRecommendation = () => {
    setEditedComponents(prevState => ({
      ...prevState,
      recommendations: [...(prevState.recommendations || []), { recoName: '', jobType: '', spich: '', mainVid: '' }]
    }));
  };

  // Remove a recommendation from the recommendations component
  const removeRecommendation = (index) => {
    setEditedComponents(prevState => ({
      ...prevState,
      recommendations: prevState.recommendations.filter((_, i) => i !== index)
    }));
  };

  // Save changes to a specific component
  const saveComponentChanges = (componentName) => {
    const updatedComponent = editedComponents[componentName];
    if (updatedComponent) {
      const newHomePageData = {
        ...homePageData,
        [componentName]: updatedComponent
      };
      updateHomePageData(newHomePageData); // Update the context with the new data
      alert('הקומפוננטה עודכנה בהצלחה'); // Notify user of successful update
    }
  };

  return (
    <div className="mhp-container">
      <h1 className="mhp-title">ניהול עמוד הבית</h1>

      {/* OpenComp Component Management */}
      <div className="mhp-component">
        <h2>קומפוננטת פתיחה</h2>
        <input
          value={editedComponents.openComp?.mainTitle || ''}
          onChange={(e) => handleFieldChange('openComp', 'mainTitle', e.target.value)}
          placeholder="כותרת ראשית"
        />
        <h3>תכונות</h3>
        {(editedComponents.openComp?.features || []).map((feature, index) => (
          <input
            key={index}
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
            placeholder={`תכונה ${index + 1}`}
          />
        ))}
        <h3>תיאור</h3>
        <textarea
          value={editedComponents.openComp?.description || ''}
          onChange={(e) => handleFieldChange('openComp', 'description', e.target.value)}
          placeholder="תיאור"
        />
        <h3>קישור לסרטון</h3>
        <input
          value={editedComponents.openComp?.videoUrl || ''}
          onChange={(e) => handleFieldChange('openComp', 'videoUrl', e.target.value)}
          placeholder="קישור לסרטון"
        />
        <button className="save" onClick={() => saveComponentChanges('openComp')}>שמור שינויים</button>
      </div>

      {/* Stages Component Management */}
      <div className="mhp-component">
        <h2>עריכת שלבים</h2>
        {(editedComponents.stages || []).map((stage, index) => (
          <div key={index}>
            <input
              value={stage.title || ''}
              onChange={(e) => handleFieldChange('stages', `${index}.title`, e.target.value)}
              placeholder="כותרת שלב"
            />
            <input
              value={stage.description || ''}
              onChange={(e) => handleFieldChange('stages', `${index}.description`, e.target.value)}
              placeholder="תיאור שלב"
            />
            <button className="delete" onClick={() => removeStage(index)}>מחק שלב</button>
          </div>
        ))}
        <button className="add" onClick={addStage}>הוסף שלב חדש</button>
        <button className="save" onClick={() => saveComponentChanges('stages')}>שמור שינויים</button>
      </div>

      {/* Recommendations Component Management */}
      <div className="mhp-component">
        <h2>עריכת ממליצים</h2>
        {(editedComponents.recommendations || []).map((reco, index) => (
          <div key={index}>
            <input
              value={reco.recoName || ''}
              onChange={(e) => handleFieldChange('recommendations', `${index}.recoName`, e.target.value)}
              placeholder="שם הממליץ"
            />
            <input
              value={reco.jobType || ''}
              onChange={(e) => handleFieldChange('recommendations', `${index}.jobType`, e.target.value)}
              placeholder="סוג העבודה"
            />
            <textarea
              value={reco.spich || ''}
              onChange={(e) => handleFieldChange('recommendations', `${index}.spich`, e.target.value)}
              placeholder="תוכן ההמלצה"
            />
            <input
              value={reco.mainVid || ''}
              onChange={(e) => handleFieldChange('recommendations', `${index}.mainVid`, e.target.value)}
              placeholder="קישור לסרטון"
            />
            <button className="delete" onClick={() => removeRecommendation(index)}>מחק ממליץ</button>
          </div>
        ))}
        <button className="add" onClick={addRecommendation}>הוסף ממליץ חדש</button>
        <button className="save" onClick={() => saveComponentChanges('recommendations')}>שמור שינויים</button>
      </div>
    </div>
  );
}

export default ManageHomePage; // Export the component for use in other parts of the application
