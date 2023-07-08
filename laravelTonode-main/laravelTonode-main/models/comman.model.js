const db = require("./db.js");

exports.businessSettings = (key, lang = false) =>{
  return new Promise((resolve, reject)=>{

    let sql;
    if (lang == false) {
        sql=`SELECT * FROM business_settings where type = '${key}' `;
    }else {
        sql=`SELECT * FROM business_settings where type = '${key}' and lang= '${lang}' `;
    }

    db.query(sql,  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};


// function get_setting($key, $default = null, $lang = false)
// {
//     $settings = Cache::remember('business_settings', 86400, function () {
//         return BusinessSetting::all();
//     });

//     if ($lang == false) {
//         $setting = $settings->where('type', $key)->first();
//     } else {
//         $setting = $settings->where('type', $key)->where('lang', $lang)->first();
//         $setting = !$setting ? $settings->where('type', $key)->first() : $setting;
//     }
//     return $setting == null ? $default : $setting->value;
// }