import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSQLite: jasmine.SpyObj<SQLite>;
  let mockDbInstance: jasmine.SpyObj<SQLiteObject>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSQLite = jasmine.createSpyObj('SQLite', ['create']);
    mockDbInstance = jasmine.createSpyObj('SQLiteObject', ['executeSql']);

    mockSQLite.create.and.returnValue(Promise.resolve(mockDbInstance));

    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: Router, useValue: mockRouter },
        { provide: SQLite, useValue: mockSQLite }
      ]
    });

    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the database and create the users table', async () => {
    await service.init();
    expect(mockSQLite.create).toHaveBeenCalled();
    expect(mockDbInstance.executeSql).toHaveBeenCalledWith(jasmine.any(String), []);
  });

  it('should add a user', async () => {
    const usuario = {
      nombre: 'Juan',
      apellido: 'Pérez',
      rut: '12345678-9',
      telefono: '123456789',
      email: 'juan@example.com',
      password: 'password123'
    };

    mockDbInstance.executeSql.and.returnValue(Promise.resolve({}));

    await service.addUser(usuario);
    expect(mockDbInstance.executeSql).toHaveBeenCalledWith(
      'INSERT INTO usuarios (nombre, apellido, rut, telefono, email, password) VALUES (?, ?, ?, ?, ?, ?)',
      [usuario.nombre, usuario.apellido, usuario.rut, usuario.telefono, usuario.email, usuario.password]
    );
  });

  it('should validate user credentials', async () => {
    const email = 'juan@example.com';
    const password = 'password123';
    const mockResult = {
      rows: {
        length: 1,
        item: () => ({ nombre: 'Juan', apellido: 'Pérez', email })
      }
    };

    mockDbInstance.executeSql.and.returnValue(Promise.resolve(mockResult));

    const usuario = await service.validateUser(email, password);
    expect(usuario).toBeTruthy();
    expect(usuario.nombre).toBe('Juan');
    expect(usuario.apellido).toBe('Pérez');
  });

  it('should return null if user not found during validation', async () => {
    const email = 'noexistent@example.com';
    const password = 'wrongpassword';
    const mockResult = {
      rows: {
        length: 0,
      }
    };

    mockDbInstance.executeSql.and.returnValue(Promise.resolve(mockResult));

    const usuario = await service.validateUser(email, password);
    expect(usuario).toBeNull();
  });

  it('should activate route if users exist', async () => {
    const mockResult = {
      rows: {
        length: 1,
      }
    };

    mockDbInstance.executeSql.and.returnValue(Promise.resolve(mockResult));

    const result = await service.canActivate();
    expect(result).toBeTrue();
  });

  it('should navigate to login if no users exist', async () => {
    const mockResult = {
      rows: {
        length: 0,
      }
    };

    mockDbInstance.executeSql.and.returnValue(Promise.resolve(mockResult));

    const result = await service.canActivate();
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
