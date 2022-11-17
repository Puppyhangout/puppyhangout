export const orma_schema = {
  "migrations": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "character_count": 64,
      "default": "unique_rowid()"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 255
    },
    "run_on": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6
    },
    "$indexes": [
      {
        "index_name": "migrations_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "users": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.users_id_seq'::REGCLASS)"
    },
    "email": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "password": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 10485760
    },
    "first_name": {
      "data_type": "character varying",
      "ordinal_position": 4,
      "character_count": 10485760
    },
    "last_name": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "character_count": 10485760
    },
    "phone": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "character_count": 10485760
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 7,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 8,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 9,
      "not_null": true,
      "character_count": 10485760
    },
    "is_verified": {
      "data_type": "boolean",
      "ordinal_position": 10
    },
    "$indexes": [
      {
        "index_name": "users_email_uq",
        "is_unique": true,
        "fields": [
          "email"
        ],
        "invisible": false
      },
      {
        "index_name": "users_phone_uq",
        "is_unique": true,
        "fields": [
          "phone"
        ],
        "invisible": false
      },
      {
        "index_name": "users_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "users_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "roles": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.roles_id_seq'::REGCLASS)"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 10485760
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "roles_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "roles_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "roles_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "user_has_roles": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.user_has_roles_id_seq'::REGCLASS)"
    },
    "user_id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "role_id": {
      "data_type": "bigint",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 64,
      "references": {
        "roles": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "user_has_roles_user_id_role_id_uq",
        "is_unique": true,
        "fields": [
          "role_id",
          "user_id"
        ],
        "invisible": false
      },
      {
        "index_name": "user_has_roles_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "user_has_roles_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "permissions": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.permissions_id_seq'::REGCLASS)"
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 2,
      "not_null": true
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "permissions_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      },
      {
        "index_name": "permissions_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "permissions_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "role_has_permissions": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.role_has_permissions_id_seq'::REGCLASS)"
    },
    "role_id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64,
      "references": {
        "roles": {
          "id": {}
        }
      }
    },
    "permission_id": {
      "data_type": "bigint",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 64,
      "references": {
        "permissions": {
          "id": {}
        }
      }
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "role_has_permissions_role_id_permission_id_uq",
        "is_unique": true,
        "fields": [
          "permission_id",
          "role_id"
        ],
        "invisible": false
      },
      {
        "index_name": "role_has_permissions_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "role_has_permissions_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "groups": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.groups_id_seq'::REGCLASS)"
    },
    "name": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 3,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "groups_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "groups_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "groups_name_uq",
        "is_unique": true,
        "fields": [
          "name"
        ],
        "invisible": false
      }
    ]
  },
  "user_info": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.user_info_id_seq'::REGCLASS)"
    },
    "user_id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "photo_url": {
      "data_type": "character varying",
      "ordinal_position": 4,
      "character_count": 10485760
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 6,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 7,
      "not_null": true,
      "character_count": 10485760
    },
    "lat": {
      "data_type": "character varying",
      "ordinal_position": 8
    },
    "lng": {
      "data_type": "character varying",
      "ordinal_position": 9
    },
    "user_description": {
      "data_type": "character varying",
      "ordinal_position": 10
    },
    "user_description2": {
      "data_type": "character varying",
      "ordinal_position": 11
    },
    "lastlogin": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 12,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "max_match_dist": {
      "data_type": "character varying",
      "ordinal_position": 13
    },
    "lastcheckmsg": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 14,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "$indexes": [
      {
        "index_name": "user_info_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "user_info_user_id_uq",
        "is_unique": true,
        "fields": [
          "user_id"
        ],
        "invisible": false
      },
      {
        "index_name": "user_info_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "puppies": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.puppies_id_seq'::REGCLASS)"
    },
    "user_id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "breed": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 10485760
    },
    "name": {
      "data_type": "character varying",
      "ordinal_position": 4,
      "not_null": true,
      "character_count": 10485760
    },
    "size": {
      "data_type": "character varying",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 10485760
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 6,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 7,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 8,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "puppies_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "puppies_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "photos": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.photos_id_seq'::REGCLASS)"
    },
    "puppy_id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64,
      "references": {
        "puppies": {
          "id": {}
        }
      }
    },
    "url": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 10485760
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "photos_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      },
      {
        "index_name": "photos_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      }
    ]
  },
  "messages": {
    "id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "primary_key": true,
      "character_count": 64,
      "default": "nextval('public.messages_id_seq'::REGCLASS)"
    },
    "from_user_id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "to_user_id": {
      "data_type": "bigint",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 64,
      "references": {
        "users": {
          "id": {}
        }
      }
    },
    "message": {
      "data_type": "character varying",
      "ordinal_position": 4,
      "not_null": true,
      "character_count": 10485760
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 6,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "resource_id": {
      "data_type": "character varying",
      "ordinal_position": 7,
      "not_null": true,
      "character_count": 10485760
    },
    "$indexes": [
      {
        "index_name": "messages_pkey",
        "is_unique": true,
        "fields": [
          "id"
        ],
        "invisible": false
      },
      {
        "index_name": "messages_resource_id_uq",
        "is_unique": true,
        "fields": [
          "resource_id"
        ],
        "invisible": false
      }
    ]
  },
  "swipe_actions": {
    "from_user_id": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "character_count": 64
    },
    "to_user_id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "character_count": 64
    },
    "action_id": {
      "data_type": "bigint",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 64
    },
    "action_time": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "rowid": {
      "data_type": "bigint",
      "ordinal_position": 5,
      "not_null": true,
      "character_count": 64,
      "default": "unique_rowid()"
    },
    "$indexes": [
      {
        "index_name": "swipe_actions_pkey",
        "is_unique": true,
        "fields": [
          "rowid"
        ],
        "invisible": false
      }
    ]
  },
  "verification_tokens": {
    "rowid": {
      "data_type": "bigint",
      "ordinal_position": 1,
      "not_null": true,
      "character_count": 64,
      "default": "unique_rowid()"
    },
    "id": {
      "data_type": "bigint",
      "ordinal_position": 2,
      "not_null": true,
      "character_count": 64,
      "default": "unique_rowid()"
    },
    "email": {
      "data_type": "character varying",
      "ordinal_position": 3,
      "not_null": true,
      "character_count": 10485760
    },
    "created_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 4,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "updated_at": {
      "data_type": "timestamp without time zone",
      "ordinal_position": 5,
      "not_null": true,
      "decimal_places": 6,
      "default": "now():::TIMESTAMP"
    },
    "token": {
      "data_type": "character varying",
      "ordinal_position": 6,
      "not_null": true
    },
    "$indexes": [
      {
        "index_name": "verification_tokens_pkey",
        "is_unique": true,
        "fields": [
          "rowid"
        ],
        "invisible": false
      }
    ]
  }
} as const